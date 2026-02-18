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

    const cacheKey = new Request(request.url, request);
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) {
        return cached;
    }

    try {
        const [expected, current] = await Promise.all([
            fetchJson('https://www.dhlottery.co.kr/lt645/selectRnk1ExpcAmt.do'),
            fetchJson('https://www.dhlottery.co.kr/lt645/selectThsLt645Info.do')
        ]);

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
        response.headers.set('Cache-Control', 'public, max-age=60');
        context.waitUntil(cache.put(cacheKey, response.clone()));
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

async function fetchJson(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
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
