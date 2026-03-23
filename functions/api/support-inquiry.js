export async function onRequest(context) {
    const { request } = context;
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: buildHeaders() });
    }
    if (request.method !== 'POST') {
        return jsonResponse({ returnValue: 'fail', message: 'method not allowed' }, 405);
    }

    let payload = null;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse({ returnValue: 'fail', message: '잘못된 요청 형식입니다.' }, 400);
    }

    const subject = normalizeSingleLine(payload?.subject, 120);
    const message = normalizeBody(payload?.message, 4000);
    const senderEmail = normalizeSingleLine(payload?.senderEmail, 160).toLowerCase();
    const senderUid = normalizeSingleLine(payload?.senderUid, 120);
    const nickname = normalizeSingleLine(payload?.nickname, 80);

    if (subject.length < 2) {
        return jsonResponse({ returnValue: 'fail', message: '문의 제목을 2자 이상 입력해 주세요.' }, 400);
    }
    if (message.length < 10) {
        return jsonResponse({ returnValue: 'fail', message: '문의 내용은 10자 이상 입력해 주세요.' }, 400);
    }
    if (!isValidEmail(senderEmail)) {
        return jsonResponse({ returnValue: 'fail', message: '로그인한 이메일 정보를 확인할 수 없습니다.' }, 400);
    }

    const apiKey = String(context.env?.RESEND_API_KEY || '').trim();
    const from = String(context.env?.SUPPORT_INQUIRY_FROM || '').trim();
    const to = String(context.env?.SUPPORT_INQUIRY_TO || 'impaztt@gmail.com').trim();

    if (!apiKey || !from) {
        return jsonResponse({ returnValue: 'fail', message: '문의 메일 설정이 아직 완료되지 않았습니다.' }, 500);
    }

    try {
        await sendSupportInquiry({
            apiKey,
            from,
            to,
            subject,
            message,
            senderEmail,
            senderUid,
            nickname
        });
        return jsonResponse({ returnValue: 'success' }, 200);
    } catch (error) {
        console.error('support inquiry send failed', error);
        return jsonResponse(
            {
                returnValue: 'fail',
                message: '문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.'
            },
            502
        );
    }
}

async function sendSupportInquiry({ apiKey, from, to, subject, message, senderEmail, senderUid, nickname }) {
    const bodyLines = [
        '새 고객센터 문의가 접수되었습니다.',
        '',
        '보내는 ID: ' + senderEmail,
        nickname ? '닉네임: ' + nickname : '',
        senderUid ? 'UID: ' + senderUid : '',
        '',
        '[제목]',
        subject,
        '',
        '[내용]',
        message
    ].filter(Boolean);

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from,
            to: [to],
            subject: '[Lotto 문의] ' + subject,
            text: bodyLines.join('\n'),
            reply_to: senderEmail
        })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || ('resend_error_' + response.status));
    }
}

function normalizeSingleLine(value, maxLength) {
    return String(value || '')
        .replace(/[\r\n]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, maxLength);
}

function normalizeBody(value, maxLength) {
    return String(value || '')
        .replace(/\r\n/g, '\n')
        .trim()
        .slice(0, maxLength);
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function jsonResponse(payload, status = 200) {
    return new Response(JSON.stringify(payload), {
        status,
        headers: buildHeaders()
    });
}

function buildHeaders() {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store'
    };
}