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
        headers: buildHeaders(request, targetUrl),
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

function buildHeaders(request, targetUrl) {
    const headers = new Headers(request.headers);
    headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36');
    headers.set('Referer', targetUrl ? targetUrl.toString() : `${ORIGIN}/`);
    headers.set('Origin', ORIGIN);
    if (!headers.has('Accept-Language')) {
        headers.set('Accept-Language', 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7');
    }
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
    output = output.replace(/\s(?:src|href|action)=("|')\/(?!\/)([^"']+)(\1)/g, (match, quote, path) => {
        return match.replace(`/${path}`, `/mirror/proxy?url=${encodeURIComponent(`${ORIGIN}/${path}`)}`);
    });
    output = output.replace(/\s(?:src|href|action)=("|')(https?:\/\/(?:www\.)?dhlottery\.co\.kr\/[^"']+)(\1)/gi, (match, quote, absoluteUrl) => {
        return match.replace(absoluteUrl, `/mirror/proxy?url=${encodeURIComponent(absoluteUrl)}`);
    });
    output = output.replace(/\s(?:src|href|action)=("|')(\/\/(?:www\.)?dhlottery\.co\.kr\/[^"']+)(\1)/gi, (match, quote, protocolRelativeUrl) => {
        return match.replace(protocolRelativeUrl, `/mirror/proxy?url=${encodeURIComponent(`https:${protocolRelativeUrl}`)}`);
    });
    output = output.replace(/url\(("|')?\/(?!\/)([^"')]+)("|')?\)/g, (match, q1, path) => {
        return `url(/mirror/proxy?url=${encodeURIComponent(`${ORIGIN}/${path}`)})`;
    });
    output = output.replace(/url\(("|')?(https?:\/\/(?:www\.)?dhlottery\.co\.kr\/[^"')]+)("|')?\)/gi, (match, q1, absoluteUrl) => {
        return `url(/mirror/proxy?url=${encodeURIComponent(absoluteUrl)})`;
    });
    output = output.replace(/url\(("|')?(\/\/(?:www\.)?dhlottery\.co\.kr\/[^"')]+)("|')?\)/gi, (match, q1, protocolRelativeUrl) => {
        return `url(/mirror/proxy?url=${encodeURIComponent(`https:${protocolRelativeUrl}`)})`;
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
    const script = `\n<script>\n(function(){\n  const ORIGIN='${ORIGIN}';\n  const PROXY='/mirror/proxy?url=';\n  const NOISY_ERROR_RE=/(처리 중 오류|오류가 발생|에러가 발생|비정상 접근|잘못된 접근|서비스를 이용할 수 없습니다)/;\n  function toProxy(input){\n    try{\n      const u=new URL(input,ORIGIN);\n      if(u.origin!==ORIGIN){return input;}\n      return PROXY+encodeURIComponent(u.href);\n    }catch(e){return input;}\n  }\n  function shouldSuppressDialog(message){\n    return NOISY_ERROR_RE.test(String(message||''));\n  }\n  const nativeAlert=window.alert ? window.alert.bind(window) : null;\n  window.alert=function(message){\n    if(shouldSuppressDialog(message)){return;}\n    if(nativeAlert){return nativeAlert(message);}\n  };\n  const nativeConfirm=window.confirm ? window.confirm.bind(window) : null;\n  window.confirm=function(message){\n    if(shouldSuppressDialog(message)){return true;}\n    if(nativeConfirm){return nativeConfirm(message);}\n    return true;\n  };\n  const nativePrompt=window.prompt ? window.prompt.bind(window) : null;\n  window.prompt=function(message,defaultValue){\n    if(shouldSuppressDialog(message)){return defaultValue||'';}\n    if(nativePrompt){return nativePrompt(message,defaultValue);}\n    return defaultValue||'';\n  };\n  function patchJqueryDialogs(){\n    const $=window.jQuery;\n    if(!$){return;}\n    if(typeof $.alert==='function' && !$.alert.__mirrorWrapped){\n      const originalAlert=$.alert;\n      const wrappedAlert=function(message,callback){\n        if(shouldSuppressDialog(message)){\n          if(typeof callback==='function'){callback();}\n          return;\n        }\n        return originalAlert.apply(this,arguments);\n      };\n      wrappedAlert.__mirrorWrapped=true;\n      $.alert=wrappedAlert;\n    }\n    if(typeof $.confirm==='function' && !$.confirm.__mirrorWrapped){\n      const originalConfirm=$.confirm;\n      const wrappedConfirm=function(message,okFn,cancelFn){\n        if(shouldSuppressDialog(message)){\n          if(typeof okFn==='function'){okFn();}\n          return;\n        }\n        return originalConfirm.apply(this,arguments);\n      };\n      wrappedConfirm.__mirrorWrapped=true;\n      $.confirm=wrappedConfirm;\n    }\n  }\n  patchJqueryDialogs();\n  setTimeout(patchJqueryDialogs, 0);\n  setTimeout(patchJqueryDialogs, 300);\n  setTimeout(patchJqueryDialogs, 1200);\n  window.callTracerApiInput=function(){};\n  window.callTracerApiOutput=function(){};\n  window.checkInAPI=function(){};\n  window.checkOutAPI=function(){};\n  document.addEventListener('DOMContentLoaded', function(){\n    patchJqueryDialogs();\n    const waitPage=document.getElementById('waitPage');\n    if(waitPage){waitPage.style.display='none';}\n  });\n  const origFetch=window.fetch;\n  if(origFetch){\n    window.fetch=function(input,init){\n      if(typeof input==='string'){\n        return origFetch(toProxy(input),init);\n      }\n      if(input && input.url){\n        const req=new Request(toProxy(input.url),input);\n        return origFetch(req,init);\n      }\n      return origFetch(input,init);\n    };\n  }\n  const origOpen=XMLHttpRequest.prototype.open;\n  XMLHttpRequest.prototype.open=function(method,url){\n    const args=Array.prototype.slice.call(arguments,2);\n    return origOpen.call(this,method,toProxy(url),...args);\n  };\n  const origAssign=window.location.assign.bind(window.location);\n  const origReplace=window.location.replace.bind(window.location);\n  window.location.assign=function(url){\n    return origAssign(toProxy(url));\n  };\n  window.location.replace=function(url){\n    return origReplace(toProxy(url));\n  };\n  const origOpenWindow=window.open;\n  window.open=function(url,name,features){\n    return origOpenWindow(toProxy(url),name,features);\n  };\n})();\n</script>\n`;
    if (html.includes('<!-- mirror-injected -->')) {
        return html;
    }
    if (html.includes('</head>')) {
        return html.replace('</head>', `<!-- mirror-injected -->${script}</head>`);
    }
    return `<!-- mirror-injected -->${script}` + html;
}
