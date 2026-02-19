const ORIGIN = 'https://www.dhlottery.co.kr';

export async function onRequest(context) {
    const upstream = await fetch(`${ORIGIN}/lt645/intro`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; product-lotto/1.0)',
            Referer: `${ORIGIN}/lt645/intro`
        },
        redirect: 'follow'
    });

    const html = await upstream.text();
    const rewritten = rewriteHtml(html);
    return new Response(rewritten, {
        status: upstream.status,
        headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=60'
        }
    });
}

function rewriteHtml(html) {
    let output = html;
    output = output.replace(/\s(?:src|href)=("|')\/(?!\/)([^"']+)(\1)/g, (match, quote, path) => {
        return match.replace(`/${path}`, `/mirror/proxy?url=${encodeURIComponent(`${ORIGIN}/${path}`)}`);
    });
    output = output.replace(/url\(("|')?\/(?!\/)([^"')]+)("|')?\)/g, (match, q1, path) => {
        return `url(/mirror/proxy?url=${encodeURIComponent(`${ORIGIN}/${path}`)})`;
    });
    output = injectOverrides(output);
    return output;
}

function injectOverrides(html) {
    const blueCss = `\n<style>\n:root{--lt645-blue:#1e6bff;--lt645-blue-dark:#0f5bd8;}\n.color-lt645,.color-p{color:var(--lt645-blue)!important;}\n.btn-butNow,.btn-go.btn-up{background:var(--lt645-blue)!important;border-color:var(--lt645-blue)!important;color:#fff!important;}\n.btn-go,.btn-line,.btn-viewLine,.btn-viewProfit,.btn-goTerms{border-color:var(--lt645-blue)!important;color:var(--lt645-blue)!important;}\n.btn-line.btn-arrow::after,.btn-viewLine::after{border-color:var(--lt645-blue)!important;}\n</style>\n`;
    const patch = `\n<script>\n(function(){\n  const ORIGIN='${ORIGIN}';\n  const PROXY='/mirror/proxy?url=';\n  function toProxy(input){\n    try{\n      const u=new URL(input,ORIGIN);\n      if(u.origin!==ORIGIN){return input;}\n      return PROXY+encodeURIComponent(u.href);\n    }catch(e){return input;}\n  }\n  const origFetch=window.fetch;\n  if(origFetch){\n    window.fetch=function(input,init){\n      if(typeof input==='string'){return origFetch(toProxy(input),init);}\n      if(input && input.url){const req=new Request(toProxy(input.url),input);return origFetch(req,init);}\n      return origFetch(input,init);\n    };\n  }\n  const origOpen=XMLHttpRequest.prototype.open;\n  XMLHttpRequest.prototype.open=function(method,url){\n    const args=Array.prototype.slice.call(arguments,2);\n    return origOpen.call(this,method,toProxy(url),...args);\n  };\n  const origAssign=window.location.assign.bind(window.location);\n  const origReplace=window.location.replace.bind(window.location);\n  window.location.assign=function(url){\n    return origAssign(toProxy(url));\n  };\n  window.location.replace=function(url){\n    return origReplace(toProxy(url));\n  };\n  const origOpenWindow=window.open;\n  window.open=function(url,name,features){\n    return origOpenWindow(toProxy(url),name,features);\n  };\n  const btnBuy=document.getElementById('btnBuyLt645');\n  if(btnBuy){\n    btnBuy.addEventListener('click',function(e){\n      e.preventDefault();\n      try{window.parent.postMessage({type:'switch-tab',tab:'draw'},'*');}catch(err){}\n    });\n  }\n})();\n</script>\n`;
    if (html.includes('<!-- mirror-injected -->')) {
        return html;
    }
    if (html.includes('</head>')) {
        return html.replace('</head>', `<!-- mirror-injected -->${blueCss}${patch}</head>`);
    }
    return `<!-- mirror-injected -->${blueCss}${patch}` + html;
}
