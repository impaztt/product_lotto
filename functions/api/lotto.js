export async function onRequestGet(context) {
    const { request } = context;
    const url = new URL(request.url);
    const drwNo = url.searchParams.get('drwNo');

    if (!drwNo || !/^\d+$/.test(drwNo)) {
        return new Response(JSON.stringify({ returnValue: 'fail', message: 'drwNo is required' }), {
            status: 400,
            headers: buildHeaders()
        });
    }

    const targetUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
    const upstream = await fetch(targetUrl, {
        headers: {
            'User-Agent': 'product-lotto-proxy'
        }
    });

    if (!upstream.ok) {
        return new Response(JSON.stringify({ returnValue: 'fail', message: 'upstream error' }), {
            status: 502,
            headers: buildHeaders()
        });
    }

    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: buildHeaders()
    });
}

function buildHeaders() {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=300'
    };
}
