/* */
"format cjs";"use strict";var assign=require("./Object.assign"),ReactContext={current:{},withContext:function(e,t){var n,r=ReactContext.current;ReactContext.current=assign({},r,e);try{n=t()}finally{ReactContext.current=r}return n}};module.exports=ReactContext;
//# sourceMappingURL=ReactContext.js.map