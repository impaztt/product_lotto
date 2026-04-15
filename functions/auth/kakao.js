// Cloudflare Pages Function: POST /auth/kakao
// Exchanges a Kakao access_token for a Firebase custom token.
//
// Required environment variables (Pages → Settings → Environment variables):
//   FIREBASE_PROJECT_ID    (Plaintext)  e.g. "lotto-cd822"
//   FIREBASE_CLIENT_EMAIL  (Plaintext)  service account client_email
//   FIREBASE_PRIVATE_KEY   (Encrypted)  full PEM -----BEGIN PRIVATE KEY----- ...

const CORS_ALLOW_ORIGINS = [
    'https://product-lotto.pages.dev',
    'https://lotto-cd822.firebaseapp.com',
    'https://lotto-cd822.web.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080'
];

function corsHeaders(request) {
    const origin = request.headers.get('Origin') || '';
    const allow = CORS_ALLOW_ORIGINS.includes(origin) ? origin : CORS_ALLOW_ORIGINS[0];
    return {
        'Access-Control-Allow-Origin': allow,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '600',
        'Vary': 'Origin'
    };
}

function jsonResponse(data, init, request) {
    return new Response(JSON.stringify(data), {
        status: init?.status || 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders(request)
        }
    });
}

function base64UrlEncode(input) {
    let str;
    if (typeof input === 'string') {
        str = btoa(unescape(encodeURIComponent(input)));
    } else {
        let binary = '';
        const bytes = new Uint8Array(input);
        for (let i = 0; i < bytes.byteLength; i += 1) {
            binary += String.fromCharCode(bytes[i]);
        }
        str = btoa(binary);
    }
    return str.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function pemToArrayBuffer(pem) {
    const clean = pem
        .replace(/-----BEGIN [^-]+-----/g, '')
        .replace(/-----END [^-]+-----/g, '')
        .replace(/\\n/g, '\n')
        .replace(/\s+/g, '');
    const binary = atob(clean);
    const buf = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < binary.length; i += 1) {
        view[i] = binary.charCodeAt(i);
    }
    return buf;
}

async function importPrivateKey(pem) {
    const keyData = pemToArrayBuffer(pem);
    return crypto.subtle.importKey(
        'pkcs8',
        keyData,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );
}

async function createFirebaseCustomToken({ uid, email, displayName, photoURL }, env) {
    if (!env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
        throw new Error('Missing FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY');
    }
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
        iss: env.FIREBASE_CLIENT_EMAIL,
        sub: env.FIREBASE_CLIENT_EMAIL,
        aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
        iat,
        exp,
        uid
    };
    const claims = {};
    if (email) claims.email = email;
    if (displayName) claims.name = displayName;
    if (photoURL) claims.picture = photoURL;
    claims.provider = 'kakao';
    if (Object.keys(claims).length) {
        payload.claims = claims;
    }

    const headerB64 = base64UrlEncode(JSON.stringify(header));
    const payloadB64 = base64UrlEncode(JSON.stringify(payload));
    const signingInput = `${headerB64}.${payloadB64}`;

    const privateKey = await importPrivateKey(env.FIREBASE_PRIVATE_KEY);
    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        privateKey,
        new TextEncoder().encode(signingInput)
    );
    const sigB64 = base64UrlEncode(signature);
    return `${signingInput}.${sigB64}`;
}

async function fetchKakaoUser(accessToken) {
    const res = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Kakao user lookup failed (${res.status}): ${text}`);
    }
    return res.json();
}

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders(request) });
    }
    if (request.method !== 'POST') {
        return jsonResponse({ error: 'method_not_allowed' }, { status: 405 }, request);
    }

    let body;
    try {
        body = await request.json();
    } catch (error) {
        return jsonResponse({ error: 'invalid_json' }, { status: 400 }, request);
    }

    const accessToken = body && typeof body.accessToken === 'string' ? body.accessToken.trim() : '';
    if (!accessToken) {
        return jsonResponse({ error: 'missing_access_token' }, { status: 400 }, request);
    }

    let kakaoUser;
    try {
        kakaoUser = await fetchKakaoUser(accessToken);
    } catch (error) {
        return jsonResponse({ error: 'kakao_verify_failed', message: String(error && error.message || error) }, { status: 401 }, request);
    }

    const kakaoId = kakaoUser && kakaoUser.id;
    if (!kakaoId) {
        return jsonResponse({ error: 'kakao_id_missing' }, { status: 401 }, request);
    }

    const account = kakaoUser.kakao_account || {};
    const profile = account.profile || kakaoUser.properties || {};
    const email = typeof account.email === 'string' ? account.email : '';
    const displayName = profile.nickname || profile.nickName || '';
    const photoURL = profile.profile_image_url || profile.profile_image || '';

    try {
        const customToken = await createFirebaseCustomToken(
            {
                uid: `kakao:${kakaoId}`,
                email,
                displayName,
                photoURL
            },
            env
        );
        return jsonResponse(
            {
                customToken,
                uid: `kakao:${kakaoId}`,
                email,
                displayName,
                photoURL
            },
            { status: 200 },
            request
        );
    } catch (error) {
        return jsonResponse(
            { error: 'custom_token_failed', message: String(error && error.message || error) },
            { status: 500 },
            request
        );
    }
}
