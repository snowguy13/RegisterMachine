/* */
"format cjs";"use strict";var EventConstants=require("./EventConstants"),EventPropagators=require("./EventPropagators"),SyntheticMouseEvent=require("./SyntheticMouseEvent"),ReactMount=require("./ReactMount"),keyOf=require("./keyOf"),topLevelTypes=EventConstants.topLevelTypes,getFirstReactDOM=ReactMount.getFirstReactDOM,eventTypes={mouseEnter:{registrationName:keyOf({onMouseEnter:null}),dependencies:[topLevelTypes.topMouseOut,topLevelTypes.topMouseOver]},mouseLeave:{registrationName:keyOf({onMouseLeave:null}),dependencies:[topLevelTypes.topMouseOut,topLevelTypes.topMouseOver]}},extractedEvents=[null,null],EnterLeaveEventPlugin={eventTypes:eventTypes,extractEvents:function(e,t,n,r){if(e===topLevelTypes.topMouseOver&&(r.relatedTarget||r.fromElement))return null;if(e!==topLevelTypes.topMouseOut&&e!==topLevelTypes.topMouseOver)return null;var o;if(t.window===t)o=t;else{var a=t.ownerDocument;o=a?a.defaultView||a.parentWindow:window}var i,s;if(e===topLevelTypes.topMouseOut?(i=t,s=getFirstReactDOM(r.relatedTarget||r.toElement)||o):(i=o,s=t),i===s)return null;var u=i?ReactMount.getID(i):"",c=s?ReactMount.getID(s):"",l=SyntheticMouseEvent.getPooled(eventTypes.mouseLeave,u,r);l.type="mouseleave",l.target=i,l.relatedTarget=s;var p=SyntheticMouseEvent.getPooled(eventTypes.mouseEnter,c,r);return p.type="mouseenter",p.target=s,p.relatedTarget=i,EventPropagators.accumulateEnterLeaveDispatches(l,p,u,c),extractedEvents[0]=l,extractedEvents[1]=p,extractedEvents}};module.exports=EnterLeaveEventPlugin;
//# sourceMappingURL=EnterLeaveEventPlugin.js.map