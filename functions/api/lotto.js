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

    const round = Number(drwNo);
    try {
        const { data, diagnostics } = await fetchOfficialLotto(round);
        if (!data) {
            const mainInfoData = await fetchMainInfoRound(round);
            if (mainInfoData) {
                const mainInfoResponse = new Response(JSON.stringify(mainInfoData), {
                    status: 200,
                    headers: buildHeaders()
                });
                mainInfoResponse.headers.set('X-Lotto-Source', 'official-main');
                mainInfoResponse.headers.set('Cache-Control', 'public, max-age=600');
                context.waitUntil(cache.put(cacheKey, mainInfoResponse.clone()));
                return mainInfoResponse;
            }

            const fallbackData = getFallbackRound(round);
            if (fallbackData) {
                const fallbackResponse = new Response(JSON.stringify(fallbackData), {
                    status: 200,
                    headers: buildHeaders()
                });
                fallbackResponse.headers.set('X-Lotto-Source', 'fallback');
                fallbackResponse.headers.set('Cache-Control', 'public, max-age=86400');
                context.waitUntil(cache.put(cacheKey, fallbackResponse.clone()));
                return fallbackResponse;
            }
            return new Response(
                JSON.stringify({
                    returnValue: 'fail',
                    message: 'upstream blocked',
                    diagnostics
                }),
                {
                    status: 502,
                    headers: buildHeaders()
                }
            );
        }

        const response = new Response(JSON.stringify(data), {
            status: 200,
            headers: buildHeaders()
        });
        response.headers.set('X-Lotto-Source', 'official');
        response.headers.set('Cache-Control', 'public, max-age=600');
        context.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
    } catch (error) {
        console.log('proxy exception', error);
        const fallbackData = getFallbackRound(round);
        if (fallbackData) {
            const fallbackResponse = new Response(JSON.stringify(fallbackData), {
                status: 200,
                headers: buildHeaders()
            });
            fallbackResponse.headers.set('X-Lotto-Source', 'fallback');
            fallbackResponse.headers.set('Cache-Control', 'public, max-age=86400');
            context.waitUntil(cache.put(cacheKey, fallbackResponse.clone()));
            return fallbackResponse;
        }
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

async function fetchOfficialLotto(round) {
    const urls = [
        `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`,
        `https://dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`
    ];
    const diagnostics = [];

    for (const targetUrl of urls) {
        const attempts = [buildUpstreamHeaders(true), buildUpstreamHeaders(false)];
        for (const headers of attempts) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);
            try {
                const upstream = await fetch(targetUrl, {
                    headers,
                    redirect: 'follow',
                    signal: controller.signal
                });
                const text = await upstream.text();
                const parsed = parseOfficialResponse(text);
                if (upstream.ok && parsed && parsed.returnValue === 'success') {
                    return { data: parsed, diagnostics };
                }
                diagnostics.push({
                    url: targetUrl,
                    status: upstream.status,
                    snippet: text.slice(0, 120)
                });
            } catch (error) {
                diagnostics.push({
                    url: targetUrl,
                    error: error && error.message ? error.message : String(error)
                });
            } finally {
                clearTimeout(timeoutId);
            }
        }
    }

    return { data: null, diagnostics };
}

function parseOfficialResponse(text) {
    const trimmed = text.trim();
    if (!trimmed || trimmed.startsWith('<')) {
        return null;
    }
    try {
        return JSON.parse(trimmed);
    } catch {
        return null;
    }
}

async function fetchMainInfoRound(round) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
        const response = await fetch('https://www.dhlottery.co.kr/selectMainInfo.do', {
            headers: buildMainInfoHeaders(),
            redirect: 'follow',
            signal: controller.signal
        });
        if (!response.ok) {
            return null;
        }
        const json = await response.json();
        const list = json?.data?.result?.pstLtEpstInfo?.lt645;
        if (!Array.isArray(list)) {
            return null;
        }
        const matched = list.find(item => Number(item?.ltEpsd) === round);
        if (!matched) {
            return null;
        }
        return mapMainInfoToLottoResponse(matched);
    } catch {
        return null;
    } finally {
        clearTimeout(timeoutId);
    }
}

function mapMainInfoToLottoResponse(item) {
    const drawDate = formatDateYmd(item.ltRflYmd);
    return {
        returnValue: 'success',
        drwNo: Number(item.ltEpsd),
        drwNoDate: drawDate || '',
        drwtNo1: Number(item.tm1WnNo),
        drwtNo2: Number(item.tm2WnNo),
        drwtNo3: Number(item.tm3WnNo),
        drwtNo4: Number(item.tm4WnNo),
        drwtNo5: Number(item.tm5WnNo),
        drwtNo6: Number(item.tm6WnNo),
        bnusNo: Number(item.bnsWnNo),
        firstPrzwnerCo: Number(item.rnk1WnNope || 0),
        firstWinamnt: Number(item.rnk1WnAmt || 0),
        firstAccumamnt: Number(item.rnk1SumWnAmt || 0),
        totSellamnt: Number(item.rlvtEpsdSumNtslAmt || 0)
    };
}

function formatDateYmd(raw) {
    const value = String(raw || '');
    if (!/^\d{8}$/.test(value)) {
        return '';
    }
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function getFallbackRound(round) {
    const fallback = FALLBACK_ROUNDS[round];
    return fallback ? { ...fallback } : null;
}

const FALLBACK_ROUNDS = {
    1: {
        returnValue: 'success',
        drwNo: 1,
        drwNoDate: '2002-12-07',
        drwtNo1: 10,
        drwtNo2: 23,
        drwtNo3: 29,
        drwtNo4: 33,
        drwtNo5: 37,
        drwtNo6: 40,
        bnusNo: 16,
        firstPrzwnerCo: 0,
        firstWinamnt: 0,
        firstAccumamnt: 0,
        totSellamnt: 0
    }
};

function buildHeaders() {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}

function buildUpstreamHeaders(includeReferer) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json,text/plain,*/*',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'X-Requested-With': 'XMLHttpRequest'
    };
    if (includeReferer) {
        headers.Referer = 'https://www.dhlottery.co.kr/gameResult.do?method=byWin';
    }
    return headers;
}

function buildMainInfoHeaders() {
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json,text/plain,*/*',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://www.dhlottery.co.kr/'
    };
}
