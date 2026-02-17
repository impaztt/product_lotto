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
    const lat = Number(url.searchParams.get('lat'));
    const lng = Number(url.searchParams.get('lng'));
    const radius = clampNumber(url.searchParams.get('radius'), 2000, 500, 20000);
    const max = clampNumber(url.searchParams.get('max'), 30, 5, 100);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return new Response(JSON.stringify({ returnValue: 'fail', message: 'lat/lng required' }), {
            status: 400,
            headers: buildHeaders()
        });
    }

    try {
        const region = await resolveRegion(lat, lng, url.searchParams);
        if (!region.ctpv) {
            return new Response(JSON.stringify({ returnValue: 'fail', message: 'region not found' }), {
                status: 422,
                headers: buildHeaders()
            });
        }

        const result = await fetchStorePages(region, {
            radius,
            max
        });

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: buildHeaders()
        });
    } catch (error) {
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

async function resolveRegion(lat, lng, params) {
    const overrideCtpv = params.get('ctpv');
    const overrideSgg = params.get('sgg');
    if (overrideCtpv) {
        return {
            lat,
            lng,
            ctpv: mapCtpvShort(overrideCtpv),
            sgg: overrideSgg || ''
        };
    }

    const geo = await fetchReverseGeocode(lat, lng);
    const address = geo?.address || {};
    const ctpvFull =
        address.state
        || address.city
        || address.province
        || address.region
        || address.county
        || '';
    const sgg =
        address.borough
        || address.county
        || address.city_district
        || address.district
        || address.municipality
        || '';

    return {
        lat,
        lng,
        ctpv: mapCtpvShort(ctpvFull),
        sgg: String(sgg || '').trim()
    };
}

async function fetchReverseGeocode(lat, lng) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=ko`,
            {
                headers: {
                    'User-Agent': 'product-lotto/1.0 (+https://github.com/impaztt/product_lotto)',
                    'Accept-Language': 'ko-KR,ko;q=0.9'
                },
                signal: controller.signal
            }
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

async function fetchStorePages(region, { radius, max }) {
    const primary = await fetchStorePagesInternal(region, { radius, max });
    if (primary.stores.length || !region.sgg) {
        return primary;
    }
    const relaxed = await fetchStorePagesInternal({ ...region, sgg: '' }, { radius, max });
    return {
        ...relaxed,
        region: {
            ctpv: region.ctpv,
            sgg: ''
        }
    };
}

async function fetchStorePagesInternal(region, { radius, max }) {
    const stores = new Map();
    const perPage = 200;
    const maxPages = 5;
    let total = 0;
    let fetchedPages = 0;

    for (let page = 1; page <= maxPages; page += 1) {
        const payload = await fetchStorePage(region, page, perPage);
        const data = payload?.data || {};
        const list = Array.isArray(data.list) ? data.list : [];
        total = Number(data.total || total || 0);
        fetchedPages += 1;

        list.forEach(item => {
            const lat = Number(item.shpLat);
            const lng = Number(item.shpLot);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                return;
            }
            const id = String(item.ltShpId || `${lat}:${lng}:${item.conmNm || ''}`);
            if (!stores.has(id)) {
                stores.set(id, {
                    id,
                    name: String(item.conmNm || '복권 판매점'),
                    address: String(item.bplcRdnmDaddr || item.bplcLctnDaddr || '').trim(),
                    phone: item.shpTelno || '',
                    lat,
                    lng,
                    flags: {
                        l645: item.l645LtNtslYn === 'Y',
                        pt720: item.pt720NtslYn === 'Y'
                    }
                });
            }
        });

        if (!total || page * perPage >= total) {
            break;
        }
    }

    const origin = {
        lat: region.lat,
        lng: region.lng
    };
    const filtered = Array.from(stores.values())
        .map(item => ({
            ...item,
            distance: distanceInMeters(origin.lat, origin.lng, item.lat, item.lng)
        }))
        .filter(item => Number.isFinite(item.distance) && item.distance <= radius)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, max);

    return {
        returnValue: 'success',
        source: 'dhlottery',
        region: {
            ctpv: region.ctpv,
            sgg: region.sgg
        },
        total,
        fetchedPages,
        radius,
        stores: filtered
    };
}

async function fetchStorePage(region, pageNum, recordCountPerPage) {
    const params = new URLSearchParams({
        l645LtNtslYn: 'Y',
        l520LtNtslYn: 'N',
        st5LtNtslYn: 'N',
        st10LtNtslYn: 'N',
        st20LtNtslYn: 'N',
        cpexUsePsbltyYn: 'N',
        pageNum: String(pageNum),
        recordCountPerPage: String(recordCountPerPage),
        pageCount: '5'
    });

    if (region.ctpv) {
        params.set('srchCtpvNm', region.ctpv);
    }
    if (region.sgg) {
        params.set('srchSggNm', region.sgg);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    try {
        const response = await fetch(
            `https://www.dhlottery.co.kr/prchsplcsrch/selectLtShp.do?${params.toString()}`,
            {
                headers: buildStoreHeaders(),
                signal: controller.signal
            }
        );
        const text = await response.text();
        if (!response.ok) {
            throw new Error(`upstream error: ${response.status}`);
        }
        return JSON.parse(text);
    } finally {
        clearTimeout(timeoutId);
    }
}

function mapCtpvShort(value) {
    const raw = String(value || '').trim();
    if (!raw) {
        return '';
    }
    return CTPV_MAP[raw]
        || raw.replace('특별시', '')
            .replace('광역시', '')
            .replace('특별자치시', '')
            .replace('특별자치도', '')
            .replace('도', '');
}

function distanceInMeters(lat1, lon1, lat2, lon2) {
    const toRad = degree => degree * (Math.PI / 180);
    const earth = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2
        + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * earth * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function clampNumber(value, fallback, min, max) {
    const num = Number(value);
    if (!Number.isFinite(num)) {
        return fallback;
    }
    return Math.min(Math.max(num, min), max);
}

function buildHeaders() {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}

function buildStoreHeaders() {
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'application/json,text/plain,*/*',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://www.dhlottery.co.kr/prchsplcsrch/home',
        'X-Requested-With': 'XMLHttpRequest'
    };
}

const CTPV_MAP = {
    '서울특별시': '서울',
    '경기도': '경기',
    '부산광역시': '부산',
    '대구광역시': '대구',
    '인천광역시': '인천',
    '대전광역시': '대전',
    '울산광역시': '울산',
    '강원도': '강원',
    '충청북도': '충북',
    '충청남도': '충남',
    '광주광역시': '광주',
    '전라북도': '전북',
    '전라남도': '전남',
    '경상북도': '경북',
    '경상남도': '경남',
    '제주특별자치도': '제주',
    '세종특별자치시': '세종'
};
