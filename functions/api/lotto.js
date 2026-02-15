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

    const url = new URL(request.url);
    const drwNo = url.searchParams.get('drwNo');

    if (!drwNo || !/^\d+$/.test(drwNo)) {
        return new Response(JSON.stringify({ returnValue: 'fail', message: 'drwNo is required' }), {
            status: 400,
            headers: buildHeaders()
        });
    }

    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) {
        return cached;
    }

    const targetUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const upstream = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; product-lotto-proxy)',
                'Accept': 'application/json,text/plain,*/*',
                'Referer': 'https://www.dhlottery.co.kr/',
                'Origin': 'https://www.dhlottery.co.kr'
            },
            redirect: 'follow',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!upstream.ok) {
            console.log('upstream error', upstream.status);
            return new Response(JSON.stringify({ returnValue: 'fail', message: 'upstream error', status: upstream.status }), {
                status: 502,
                headers: buildHeaders()
            });
        }

        const data = await upstream.json();
        const response = new Response(JSON.stringify(data), {
            status: 200,
            headers: buildHeaders()
        });
        response.headers.set('Cache-Control', 'public, max-age=600');
        context.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
    } catch (error) {
        console.log('proxy exception', error);
        return new Response(
            JSON.stringify({
                returnValue: 'fail',
                message: 'proxy error',
                error: error && error.message ? error.message : String(error)
            }),
            {
                status: 502,
                headers: buildHeaders()
            }
        );
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
