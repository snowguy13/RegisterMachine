/* */
"format cjs";"use strict";function runEventQueueInBatch(e){EventPluginHub.enqueueEvents(e),EventPluginHub.processEventQueue()}var EventPluginHub=require("./EventPluginHub"),ReactEventEmitterMixin={handleTopLevel:function(e,t,n,r){var o=EventPluginHub.extractEvents(e,t,n,r);runEventQueueInBatch(o)}};module.exports=ReactEventEmitterMixin;
//# sourceMappingURL=ReactEventEmitterMixin.js.map