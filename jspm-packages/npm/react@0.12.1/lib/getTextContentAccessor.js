/* */
"format cjs";"use strict";function getTextContentAccessor(){return!contentKey&&ExecutionEnvironment.canUseDOM&&(contentKey="textContent"in document.documentElement?"textContent":"innerText"),contentKey}var ExecutionEnvironment=require("./ExecutionEnvironment"),contentKey=null;module.exports=getTextContentAccessor;
//# sourceMappingURL=getTextContentAccessor.js.map