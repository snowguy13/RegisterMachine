/* */
"format cjs";"use strict";function adler32(e){for(var t=1,n=0,r=0;r<e.length;r++)t=(t+e.charCodeAt(r))%MOD,n=(n+t)%MOD;return t|n<<16}var MOD=65521;module.exports=adler32;
//# sourceMappingURL=adler32.js.map