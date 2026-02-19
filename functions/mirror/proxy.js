const ORIGIN = 'https://www.dhlottery.co.kr';
const ALLOWED_HOSTS = new Set(['www.dhlottery.co.kr', 'dhlottery.co.kr']);

export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) {
        return new Response('missing url', { status: 400 });
    }

    let targetUrl;
    try {
        targetUrl = new URL(target);
    } catch (error) {
        return new Response('invalid url', { status: 400 });
    }

    if (!ALLOWED_HOSTS.has(targetUrl.hostname)) {
        return new Response('forbidden host', { status: 403 });
    }

    const upstream = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: buildHeaders(request),
        redirect: 'follow'
    });

    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
        const html = await upstream.text();
        const rewritten = rewriteHtml(html);
        return new Response(rewritten, {
            status: upstream.status,
            headers: proxyHeaders(contentType)
        });
    }

    if (contentType.includes('text/css')) {
        const css = await upstream.text();
        const rewritten = rewriteCss(css);
        return new Response(rewritten, {
            status: upstream.status,
            headers: proxyHeaders(contentType)
        });
    }

    return new Response(upstream.body, {
        status: upstream.status,
        headers: proxyHeaders(contentType)
    });
}

function buildHeaders(request) {
    const headers = new Headers(request.headers);
    headers.set('User-Agent', 'Mozilla/5.0 (compatible; product-lotto/1.0)');
    headers.set('Referer', `${ORIGIN}/lt645/intro`);
    headers.set('Origin', ORIGIN);
    return headers;
}

function proxyHeaders(contentType) {
    const headers = new Headers();
    if (contentType) {
        headers.set('Content-Type', contentType);
    }
    headers.set('Cache-Control', 'public, max-age=60');
    return headers;
}

function rewriteHtml(html) {
    let output = html;
    output = output.replace(/\s(?:src|href)=("|')\/(?!\/)([^"']+)(\1)/g, (match, quote, path) => {
        return match.replace(`/${path}`, `/mirror/proxy?url=${encodeURIComponent(`${ORIGIN}/${path}`)}`);
    });
    output = output.replace(/url\(("|')?\/(?!\/)([^"')]+)("|')?\)/g, (match, q1, path) => {
        return `url(/mirror/proxy?url=${encodeURIComponent(`${ORIGIN}/${path}`)})`;
    });
    output = injectMirrorScript(output);
    return output;
}

function rewriteCss(css) {
    return css
        .replace(/url\(("|')?\/(?!\/)([^"')]+)("|')?\)/g, (match, q1, path) => {
            return `url(/mirror/proxy?url=${encodeURIComponent(`${ORIGIN}/${path}`)})`;
        })
        .replace(/url\(("|')?(https?:\/\/[^"')]+)("|')?\)/g, (match, q1, url) => {
            try {
                const target = new URL(url);
                if (!ALLOWED_HOSTS.has(target.hostname)) {
                    return match;
                }
                return `url(/mirror/proxy?url=${encodeURIComponent(target.toString())})`;
            } catch {
                return match;
            }
        });
}

function injectMirrorScript(html) {
    const script = `\n<script>\n(function(){\n  const ORIGIN='${ORIGIN}';\n  const PROXY='/mirror/proxy?url=';\n  function toProxy(input){\n    try{\n      const u=new URL(input,ORIGIN);\n      if(u.origin!==ORIGIN){return input;}\n      return PROXY+encodeURIComponent(u.href);\n    }catch(e){return input;}\n  }\n  const origFetch=window.fetch;\n  if(origFetch){\n    window.fetch=function(input,init){\n      if(typeof input==='string'){\n        return origFetch(toProxy(input),init);\n      }\n      if(input && input.url){\n        const req=new Request(toProxy(input.url),input);\n        return origFetch(req,init);\n      }\n      return origFetch(input,init);\n    };\n  }\n  const origOpen=XMLHttpRequest.prototype.open;\n  XMLHttpRequest.prototype.open=function(method,url){\n    const args=Array.prototype.slice.call(arguments,2);\n    return origOpen.call(this,method,toProxy(url),...args);\n  };\n  const origAssign=window.location.assign.bind(window.location);\n  const origReplace=window.location.replace.bind(window.location);\n  window.location.assign=function(url){\n    return origAssign(toProxy(url));\n  };\n  window.location.replace=function(url){\n    return origReplace(toProxy(url));\n  };\n  const origOpenWindow=window.open;\n  window.open=function(url,name,features){\n    return origOpenWindow(toProxy(url),name,features);\n  };\n})();\n</script>\n`;
    if (html.includes('<!-- mirror-injected -->')) {
        return html;
    }
    if (html.includes('</head>')) {
        return html.replace('</head>', `<!-- mirror-injected -->${script}</head>`);
    }
    return `<!-- mirror-injected -->${script}` + html;
}
