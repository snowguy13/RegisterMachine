/* */
"format cjs";!function(e){"use strict";function t(e){return e.substring(1,e.indexOf(" "))}var n=require("./ExecutionEnvironment"),r=require("./createNodesFromMarkup"),o=require("./emptyFunction"),a=require("./getMarkupWrap"),i=require("./invariant"),s=/^(<[^ \/>]+)/,u="data-danger-index",c={dangerouslyRenderMarkup:function(c){"production"!==e.env.NODE_ENV?i(n.canUseDOM,"dangerouslyRenderMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use React.renderToString for server rendering."):i(n.canUseDOM);for(var l,p={},d=0;d<c.length;d++)"production"!==e.env.NODE_ENV?i(c[d],"dangerouslyRenderMarkup(...): Missing markup."):i(c[d]),l=t(c[d]),l=a(l)?l:"*",p[l]=p[l]||[],p[l][d]=c[d];var f=[],m=0;for(l in p)if(p.hasOwnProperty(l)){var h=p[l];for(var v in h)if(h.hasOwnProperty(v)){var g=h[v];h[v]=g.replace(s,"$1 "+u+'="'+v+'" ')}var y=r(h.join(""),o);for(d=0;d<y.length;++d){var E=y[d];E.hasAttribute&&E.hasAttribute(u)?(v=+E.getAttribute(u),E.removeAttribute(u),"production"!==e.env.NODE_ENV?i(!f.hasOwnProperty(v),"Danger: Assigning to an already-occupied result index."):i(!f.hasOwnProperty(v)),f[v]=E,m+=1):"production"!==e.env.NODE_ENV&&console.error("Danger: Discarding unexpected node:",E)}}return"production"!==e.env.NODE_ENV?i(m===f.length,"Danger: Did not assign to every index of resultList."):i(m===f.length),"production"!==e.env.NODE_ENV?i(f.length===c.length,"Danger: Expected markup to render %s nodes, but rendered %s.",c.length,f.length):i(f.length===c.length),f},dangerouslyReplaceNodeWithMarkup:function(t,a){"production"!==e.env.NODE_ENV?i(n.canUseDOM,"dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use React.renderToString for server rendering."):i(n.canUseDOM),"production"!==e.env.NODE_ENV?i(a,"dangerouslyReplaceNodeWithMarkup(...): Missing markup."):i(a),"production"!==e.env.NODE_ENV?i("html"!==t.tagName.toLowerCase(),"dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the <html> node. This is because browser quirks make this unreliable and/or slow. If you want to render to the root you must use server rendering. See renderComponentToString()."):i("html"!==t.tagName.toLowerCase());var s=r(a,o)[0];t.parentNode.replaceChild(s,t)}};module.exports=c}(require("github:jspm/nodelibs@0.0.3/process"));
//# sourceMappingURL=Danger.js.map