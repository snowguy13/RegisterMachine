/* */
"format cjs";!function(r){var e=require("through"),t=require("jstransform"),n=require("./visitors"),u=/\bprocess\.env\b/;module.exports=function(i){return i=i||r.env||{},function(r,s){function o(r){f.push(r)}function c(){var r=f.join("");if(u.test(r))try{var e=n([s,i]);r=t.transform(e,r).code}catch(o){return this.emit("error",o)}this.queue(r),this.queue(null)}if(/\.json$/.test(r))return e();var f=[];return s=s||{},e(o,c)}}}(require("github:jspm/nodelibs@0.0.3/process"));
//# sourceMappingURL=custom.js.map