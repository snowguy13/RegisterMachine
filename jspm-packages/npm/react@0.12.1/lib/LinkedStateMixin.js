/* */
"format cjs";"use strict";var ReactLink=require("./ReactLink"),ReactStateSetters=require("./ReactStateSetters"),LinkedStateMixin={linkState:function(e){return new ReactLink(this.state[e],ReactStateSetters.createStateKeySetter(this,e))}};module.exports=LinkedStateMixin;
//# sourceMappingURL=LinkedStateMixin.js.map