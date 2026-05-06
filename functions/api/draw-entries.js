// Cloudflare Pages Function: draw_entries proxy.
//
// Purpose: keep Supabase service_role key server-side and enforce per-user
// scoping so anon clients cannot read other users' uid / user_email rows.
//
// Required environment variables (Cloudflare Pages -> Settings -> Env vars):
//   SUPABASE_URL                  e.g. https://xxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY     service_role key (KEEP SECRET)
//   FIREBASE_PROJECT_ID           e.g. lotto-cd822
//
// If any are missing, requests return HTTP 501 with { error: 'not_configured' }
// so the client can keep falling back to legacy direct Supabase access while
// you finish the migration.

const FIREBASE_JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const JWKS_TTL_MS = 60 * 60 * 1000;
let jwksCache = { keys: null, fetchedAt: 0 };

export async function onRequest(context) {
    const { request, env } = context;
    if (request.method === 'OPTIONS') {
        return preflight();
    }

    const url = new URL(request.url);
    const op = (url.searchParams.get('op') || '').toLowerCase();

    const config = readConfig(env);
    if (!config) {
        return jsonResponse({ ok: false, error: 'not_configured' }, 501);
    }

    try {
        if (request.method === 'POST' && op === 'insert') {
            return await opInsert(request, config);
        }
        if (request.method === 'GET' && op === 'history') {
            return await opHistory(request, config);
        }
        if (request.method === 'GET' && op === 'sessions') {
            return await opSessions(request, config);
        }
        if (request.method === 'GET' && op === 'by-round') {
            return await opByRound(request, config);
        }
        return jsonResponse({ ok: false, error: 'unknown_op' }, 400);
    } catch (error) {
        if (error && error.statusCode) {
            return jsonResponse({ ok: false, error: error.message || 'request_failed' }, error.statusCode);
        }
        console.error('draw-entries proxy error', error);
        return jsonResponse({ ok: false, error: 'server_error' }, 500);
    }
}

function readConfig(env) {
    const url = String(env?.SUPABASE_URL || '').trim().replace(/\/+$/, '');
    const serviceRoleKey = String(env?.SUPABASE_SERVICE_ROLE_KEY || '').trim();
    const projectId = String(env?.FIREBASE_PROJECT_ID || '').trim();
    if (!url || !serviceRoleKey || !projectId) {
        return null;
    }
    return { url, serviceRoleKey, projectId };
}

async function resolveCaller(request, config) {
    const auth = request.headers.get('Authorization') || '';
    const guestId = String(request.headers.get('X-Guest-Tracking-Id') || '').trim();

    if (auth.startsWith('Bearer ')) {
        const token = auth.slice('Bearer '.length).trim();
        const payload = await verifyFirebaseIdToken(token, config.projectId);
        return {
            kind: 'member',
            uid: String(payload.sub || ''),
            email: normalizeEmail(payload.email)
        };
    }

    if (guestId && /^[A-Za-z0-9_-]{8,80}$/.test(guestId)) {
        return { kind: 'guest', guestTrackingId: guestId };
    }

    throw httpError(401, 'unauthenticated');
}

async function opInsert(request, config) {
    const caller = await resolveCaller(request, config);
    const payload = await readJson(request);
    const records = Array.isArray(payload && payload.records) ? payload.records : [];
    if (!records.length) {
        throw httpError(400, 'no_records');
    }

    const rows = records.map((record) => sanitizeInsertRow(record, caller)).filter(Boolean);
    if (!rows.length) {
        throw httpError(400, 'invalid_records');
    }

    await supabaseFetch(config, 'draw_entries', {
        method: 'POST',
        body: rows,
        prefer: 'return=minimal'
    });
    return jsonResponse({ ok: true, inserted: rows.length }, 200);
}

async function opHistory(request, config) {
    const caller = await resolveCaller(request, config);
    const query = withCallerScope({
        select: 'generation_id,created_at,source_mode,round',
        order: 'created_at.desc',
        limit: 400
    }, caller);
    const rows = await supabaseFetch(config, 'draw_entries', { query });
    return jsonResponse({ ok: true, rows: Array.isArray(rows) ? rows : [] }, 200);
}

async function opSessions(request, config) {
    const caller = await resolveCaller(request, config);
    const query = withCallerScope({
        select: 'generation_id,created_at,source_mode,round,numbers,set_no,strategy,rule_count,rule_ids',
        order: 'created_at.desc',
        limit: 600
    }, caller);
    const rows = await supabaseFetch(config, 'draw_entries', { query });
    return jsonResponse({ ok: true, rows: Array.isArray(rows) ? rows : [] }, 200);
}

async function opByRound(request, config) {
    const url = new URL(request.url);
    const round = Number(url.searchParams.get('round') || 0);
    if (!Number.isFinite(round) || round <= 0) {
        throw httpError(400, 'invalid_round');
    }
    const rows = await supabaseFetch(config, 'draw_entries', {
        query: {
            select: 'numbers',
            round: `eq.${round}`,
            limit: 5000
        }
    });
    return jsonResponse({ ok: true, rows: Array.isArray(rows) ? rows : [] }, 200);
}

function withCallerScope(query, caller) {
    if (caller.kind === 'member') {
        return { ...query, uid: `eq.${caller.uid}` };
    }
    return { ...query, guest_tracking_id: `eq.${caller.guestTrackingId}` };
}

function sanitizeInsertRow(record, caller) {
    if (!record || typeof record !== 'object') return null;
    const numbers = Array.isArray(record.numbers)
        ? record.numbers.map(Number).filter((n) => Number.isFinite(n) && n >= 1 && n <= 45)
        : [];
    if (numbers.length !== 6) return null;
    const sorted = numbers.slice().sort((a, b) => a - b);
    const sourceMode = record.source_mode === 'premium' ? 'premium' : 'self';
    const setNo = clampInt(record.set_no, 1, 20);
    const round = clampInt(record.round, 1, 1_000_000);
    const generationId = String(record.generation_id || '').trim();
    if (!generationId || generationId.length < 10 || generationId.length > 64) return null;
    const numbersKey = String(record.numbers_key || sorted.join('-')).trim();
    if (numbersKey.length < 11 || numbersKey.length > 20) return null;
    const ruleIds = Array.isArray(record.rule_ids)
        ? record.rule_ids.map((value) => String(value || '').trim()).filter(Boolean).slice(0, 80)
        : [];
    const ruleCount = clampInt(record.rule_count, 0, 80);
    const strategy = record.strategy ? String(record.strategy).trim().slice(0, 200) || null : null;
    const membershipTier = String(record.membership_tier || (caller.kind === 'member' ? 'member' : 'guest')).trim().slice(0, 40) || 'guest';

    if (caller.kind === 'member') {
        return {
            round,
            numbers: sorted,
            numbers_key: numbersKey,
            set_no: setNo,
            source_mode: sourceMode,
            strategy,
            user_type: 'member',
            membership_tier: membershipTier,
            uid: caller.uid,
            user_email: caller.email,
            guest_tracking_id: null,
            generation_id: generationId,
            rule_ids: ruleIds,
            rule_count: ruleCount
        };
    }
    return {
        round,
        numbers: sorted,
        numbers_key: numbersKey,
        set_no: setNo,
        source_mode: sourceMode,
        strategy,
        user_type: 'guest',
        membership_tier: 'guest',
        uid: null,
        user_email: null,
        guest_tracking_id: caller.guestTrackingId,
        generation_id: generationId,
        rule_ids: ruleIds,
        rule_count: ruleCount
    };
}

function clampInt(value, min, max) {
    const n = Math.floor(Number(value));
    if (!Number.isFinite(n)) return min;
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

function normalizeEmail(value) {
    const s = String(value || '').trim().toLowerCase();
    return s || null;
}

async function readJson(request) {
    try {
        return await request.json();
    } catch {
        throw httpError(400, 'invalid_json');
    }
}

async function supabaseFetch(config, path, options = {}) {
    const method = String(options.method || 'GET').toUpperCase();
    const url = new URL(`${config.url}/rest/v1/${String(path || '').replace(/^\/+/, '')}`);
    const query = options.query || {};
    Object.entries(query).forEach(([key, value]) => {
        if (value == null || value === '') return;
        url.searchParams.set(key, String(value));
    });
    const headers = {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        Accept: 'application/json'
    };
    if (method !== 'GET') {
        headers['Content-Type'] = 'application/json';
    }
    if (options.prefer) {
        headers.Prefer = options.prefer;
    }
    const response = await fetch(url.toString(), {
        method,
        headers,
        body: options.body == null ? undefined : JSON.stringify(options.body)
    });
    if (!response.ok) {
        const text = await response.text();
        const err = new Error(`supabase_${method.toLowerCase()}_${response.status}`);
        err.detail = text;
        throw err;
    }
    const text = await response.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}

async function verifyFirebaseIdToken(token, projectId) {
    if (!token || typeof token !== 'string') throw httpError(401, 'missing_token');
    const parts = token.split('.');
    if (parts.length !== 3) throw httpError(401, 'malformed_token');
    const [headerB64, payloadB64, signatureB64] = parts;

    let header;
    let payload;
    try {
        header = JSON.parse(base64UrlDecodeText(headerB64));
        payload = JSON.parse(base64UrlDecodeText(payloadB64));
    } catch {
        throw httpError(401, 'malformed_token');
    }

    if (header.alg !== 'RS256') throw httpError(401, 'alg_not_rs256');
    if (!header.kid) throw httpError(401, 'missing_kid');

    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== 'number' || payload.exp < now) throw httpError(401, 'expired');
    if (typeof payload.iat === 'number' && payload.iat > now + 60) throw httpError(401, 'iat_in_future');
    if (payload.aud !== projectId) throw httpError(401, 'aud_mismatch');
    if (payload.iss !== `https://securetoken.google.com/${projectId}`) throw httpError(401, 'iss_mismatch');
    if (!payload.sub || typeof payload.sub !== 'string') throw httpError(401, 'missing_sub');

    const jwk = await loadFirebaseJwk(header.kid);
    if (!jwk) throw httpError(401, 'unknown_kid');

    const cryptoKey = await crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['verify']
    );
    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const signature = base64UrlToUint8Array(signatureB64);
    const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', cryptoKey, signature, data);
    if (!valid) throw httpError(401, 'invalid_signature');

    return payload;
}

async function loadFirebaseJwk(kid) {
    const now = Date.now();
    if (!jwksCache.keys || (now - jwksCache.fetchedAt) > JWKS_TTL_MS) {
        const resp = await fetch(FIREBASE_JWKS_URL);
        if (!resp.ok) throw httpError(503, 'jwks_unavailable');
        const body = await resp.json();
        jwksCache = { keys: Array.isArray(body.keys) ? body.keys : [], fetchedAt: now };
    }
    return jwksCache.keys.find((k) => k.kid === kid) || null;
}

function base64UrlDecodeText(value) {
    let s = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
    const pad = s.length % 4;
    if (pad) s += '='.repeat(4 - pad);
    return atob(s);
}

function base64UrlToUint8Array(value) {
    const bin = base64UrlDecodeText(value);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
}

function httpError(statusCode, message) {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
}

function jsonResponse(payload, status = 200) {
    return new Response(JSON.stringify(payload), {
        status,
        headers: corsHeaders()
    });
}

function preflight() {
    return new Response(null, { status: 204, headers: corsHeaders() });
}

function corsHeaders() {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Guest-Tracking-Id',
        'Cache-Control': 'no-store'
    };
}
