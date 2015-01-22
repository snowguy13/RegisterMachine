/* */
"format cjs";"use strict";function shouldUseChangeEvent(e){return"SELECT"===e.nodeName||"INPUT"===e.nodeName&&"file"===e.type}function manualDispatchChangeEvent(e){var t=SyntheticEvent.getPooled(eventTypes.change,activeElementID,e);EventPropagators.accumulateTwoPhaseDispatches(t),ReactUpdates.batchedUpdates(runEventInBatch,t)}function runEventInBatch(e){EventPluginHub.enqueueEvents(e),EventPluginHub.processEventQueue()}function startWatchingForChangeEventIE8(e,t){activeElement=e,activeElementID=t,activeElement.attachEvent("onchange",manualDispatchChangeEvent)}function stopWatchingForChangeEventIE8(){activeElement&&(activeElement.detachEvent("onchange",manualDispatchChangeEvent),activeElement=null,activeElementID=null)}function getTargetIDForChangeEvent(e,t,n){return e===topLevelTypes.topChange?n:void 0}function handleEventsForChangeEventIE8(e,t,n){e===topLevelTypes.topFocus?(stopWatchingForChangeEventIE8(),startWatchingForChangeEventIE8(t,n)):e===topLevelTypes.topBlur&&stopWatchingForChangeEventIE8()}function startWatchingForValueChange(e,t){activeElement=e,activeElementID=t,activeElementValue=e.value,activeElementValueProp=Object.getOwnPropertyDescriptor(e.constructor.prototype,"value"),Object.defineProperty(activeElement,"value",newValueProp),activeElement.attachEvent("onpropertychange",handlePropertyChange)}function stopWatchingForValueChange(){activeElement&&(delete activeElement.value,activeElement.detachEvent("onpropertychange",handlePropertyChange),activeElement=null,activeElementID=null,activeElementValue=null,activeElementValueProp=null)}function handlePropertyChange(e){if("value"===e.propertyName){var t=e.srcElement.value;t!==activeElementValue&&(activeElementValue=t,manualDispatchChangeEvent(e))}}function getTargetIDForInputEvent(e,t,n){return e===topLevelTypes.topInput?n:void 0}function handleEventsForInputEventIE(e,t,n){e===topLevelTypes.topFocus?(stopWatchingForValueChange(),startWatchingForValueChange(t,n)):e===topLevelTypes.topBlur&&stopWatchingForValueChange()}function getTargetIDForInputEventIE(e){return e!==topLevelTypes.topSelectionChange&&e!==topLevelTypes.topKeyUp&&e!==topLevelTypes.topKeyDown||!activeElement||activeElement.value===activeElementValue?void 0:(activeElementValue=activeElement.value,activeElementID)}function shouldUseClickEvent(e){return"INPUT"===e.nodeName&&("checkbox"===e.type||"radio"===e.type)}function getTargetIDForClickEvent(e,t,n){return e===topLevelTypes.topClick?n:void 0}var EventConstants=require("./EventConstants"),EventPluginHub=require("./EventPluginHub"),EventPropagators=require("./EventPropagators"),ExecutionEnvironment=require("./ExecutionEnvironment"),ReactUpdates=require("./ReactUpdates"),SyntheticEvent=require("./SyntheticEvent"),isEventSupported=require("./isEventSupported"),isTextInputElement=require("./isTextInputElement"),keyOf=require("./keyOf"),topLevelTypes=EventConstants.topLevelTypes,eventTypes={change:{phasedRegistrationNames:{bubbled:keyOf({onChange:null}),captured:keyOf({onChangeCapture:null})},dependencies:[topLevelTypes.topBlur,topLevelTypes.topChange,topLevelTypes.topClick,topLevelTypes.topFocus,topLevelTypes.topInput,topLevelTypes.topKeyDown,topLevelTypes.topKeyUp,topLevelTypes.topSelectionChange]}},activeElement=null,activeElementID=null,activeElementValue=null,activeElementValueProp=null,doesChangeEventBubble=!1;ExecutionEnvironment.canUseDOM&&(doesChangeEventBubble=isEventSupported("change")&&(!("documentMode"in document)||document.documentMode>8));var isInputEventSupported=!1;ExecutionEnvironment.canUseDOM&&(isInputEventSupported=isEventSupported("input")&&(!("documentMode"in document)||document.documentMode>9));var newValueProp={get:function(){return activeElementValueProp.get.call(this)},set:function(e){activeElementValue=""+e,activeElementValueProp.set.call(this,e)}},ChangeEventPlugin={eventTypes:eventTypes,extractEvents:function(e,t,n,r){var o,a;if(shouldUseChangeEvent(t)?doesChangeEventBubble?o=getTargetIDForChangeEvent:a=handleEventsForChangeEventIE8:isTextInputElement(t)?isInputEventSupported?o=getTargetIDForInputEvent:(o=getTargetIDForInputEventIE,a=handleEventsForInputEventIE):shouldUseClickEvent(t)&&(o=getTargetIDForClickEvent),o){var i=o(e,t,n);if(i){var s=SyntheticEvent.getPooled(eventTypes.change,i,r);return EventPropagators.accumulateTwoPhaseDispatches(s),s}}a&&a(e,t,n)}};module.exports=ChangeEventPlugin;
//# sourceMappingURL=ChangeEventPlugin.js.map