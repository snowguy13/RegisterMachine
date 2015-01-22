/* */
"format cjs";"use strict";var getUnboundedScrollPosition=require("./getUnboundedScrollPosition"),ViewportMetrics={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(){var e=getUnboundedScrollPosition(window);ViewportMetrics.currentScrollLeft=e.x,ViewportMetrics.currentScrollTop=e.y}};module.exports=ViewportMetrics;
//# sourceMappingURL=ViewportMetrics.js.map