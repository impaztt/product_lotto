export async function onRequest(context) {
    const { request } = context;
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: buildHeaders() });
    }
    if (request.method !== 'GET') {
        return new Response(JSON.stringify({ returnValue: 'fail', message: 'method not allowed' }), {
            status: 405,
            headers: buildHeaders()
        });
    }

    try {
        const [expectedResult, currentResult] = await Promise.allSettled([
            fetchJsonWithRetry('https://www.dhlottery.co.kr/lt645/selectRnk1ExpcAmt.do', { retries: 1, timeoutMs: 10000 }),
            fetchJsonWithRetry('https://www.dhlottery.co.kr/lt645/selectThsLt645Info.do', { retries: 1, timeoutMs: 10000 })
        ]);
        const expected = expectedResult.status === 'fulfilled' ? expectedResult.value : null;
        const current = currentResult.status === 'fulfilled' ? currentResult.value : null;
        if (!expected && !current) {
            throw new Error('both upstream requests failed');
        }

        const payload = {
            returnValue: 'success',
            expected: expected?.data?.result || null,
            current: current?.data?.result || null,
            gameMng: current?.data?.gameMng ?? null
        };

        const response = new Response(JSON.stringify(payload), {
            status: 200,
            headers: buildHeaders()
        });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        return new Response(
            JSON.stringify({
                returnValue: 'fail',
                message: 'upstream error',
                error: error && error.message ? error.message : String(error)
            }),
            {
                status: 502,
                headers: buildHeaders()
            }
        );
    }
}

async function fetchJsonWithRetry(url, { retries = 1, timeoutMs = 10000 } = {}) {
    let lastError = null;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await fetchJson(url, timeoutMs);
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError || new Error('unknown upstream error');
}

async function fetchJson(url, timeoutMs = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; product-lotto/1.0)',
                Referer: 'https://www.dhlottery.co.kr/lt645/intro',
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json'
            },
            redirect: 'follow',
            signal: controller.signal
        });
        if (!response.ok) {
            throw new Error(`upstream ${response.status}`);
        }
        return await response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

function buildHeaders() {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}
