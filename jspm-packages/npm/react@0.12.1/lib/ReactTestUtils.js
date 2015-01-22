/* */
"format cjs";"use strict";function Event(){}function makeSimulator(e){return function(t,n){var r;ReactTestUtils.isDOMComponent(t)?r=t.getDOMNode():t.tagName&&(r=t);var o=new Event;o.target=r;var a=new SyntheticEvent(ReactBrowserEventEmitter.eventNameDispatchConfigs[e],ReactMount.getID(r),o);assign(a,n),EventPropagators.accumulateTwoPhaseDispatches(a),ReactUpdates.batchedUpdates(function(){EventPluginHub.enqueueEvents(a),EventPluginHub.processEventQueue()})}}function buildSimulators(){ReactTestUtils.Simulate={};var e;for(e in ReactBrowserEventEmitter.eventNameDispatchConfigs)ReactTestUtils.Simulate[e]=makeSimulator(e)}function makeNativeSimulator(e){return function(t,n){var r=new Event(e);assign(r,n),ReactTestUtils.isDOMComponent(t)?ReactTestUtils.simulateNativeEventOnDOMComponent(e,t,r):t.tagName&&ReactTestUtils.simulateNativeEventOnNode(e,t,r)}}var EventConstants=require("./EventConstants"),EventPluginHub=require("./EventPluginHub"),EventPropagators=require("./EventPropagators"),React=require("./React"),ReactElement=require("./ReactElement"),ReactBrowserEventEmitter=require("./ReactBrowserEventEmitter"),ReactMount=require("./ReactMount"),ReactTextComponent=require("./ReactTextComponent"),ReactUpdates=require("./ReactUpdates"),SyntheticEvent=require("./SyntheticEvent"),assign=require("./Object.assign"),topLevelTypes=EventConstants.topLevelTypes,ReactTestUtils={renderIntoDocument:function(e){var t=document.createElement("div");return React.render(e,t)},isElement:function(e){return ReactElement.isValidElement(e)},isElementOfType:function(e,t){return ReactElement.isValidElement(e)&&e.type===t.type},isDOMComponent:function(e){return!!(e&&e.mountComponent&&e.tagName)},isDOMComponentElement:function(e){return!!(e&&ReactElement.isValidElement(e)&&e.tagName)},isCompositeComponent:function(e){return"function"==typeof e.render&&"function"==typeof e.setState},isCompositeComponentWithType:function(e,t){return!(!ReactTestUtils.isCompositeComponent(e)||e.constructor!==t.type)},isCompositeComponentElement:function(e){if(!ReactElement.isValidElement(e))return!1;var t=e.type.prototype;return"function"==typeof t.render&&"function"==typeof t.setState},isCompositeComponentElementWithType:function(e,t){return!(!ReactTestUtils.isCompositeComponentElement(e)||e.constructor!==t)},isTextComponent:function(e){return e instanceof ReactTextComponent.type},findAllInRenderedTree:function(e,t){if(!e)return[];var n=t(e)?[e]:[];if(ReactTestUtils.isDOMComponent(e)){var r,o=e._renderedChildren;for(r in o)o.hasOwnProperty(r)&&(n=n.concat(ReactTestUtils.findAllInRenderedTree(o[r],t)))}else ReactTestUtils.isCompositeComponent(e)&&(n=n.concat(ReactTestUtils.findAllInRenderedTree(e._renderedComponent,t)));return n},scryRenderedDOMComponentsWithClass:function(e,t){return ReactTestUtils.findAllInRenderedTree(e,function(e){var n=e.props.className;return ReactTestUtils.isDOMComponent(e)&&n&&-1!==(" "+n+" ").indexOf(" "+t+" ")})},findRenderedDOMComponentWithClass:function(e,t){var n=ReactTestUtils.scryRenderedDOMComponentsWithClass(e,t);if(1!==n.length)throw new Error("Did not find exactly one match for class:"+t);return n[0]},scryRenderedDOMComponentsWithTag:function(e,t){return ReactTestUtils.findAllInRenderedTree(e,function(e){return ReactTestUtils.isDOMComponent(e)&&e.tagName===t.toUpperCase()})},findRenderedDOMComponentWithTag:function(e,t){var n=ReactTestUtils.scryRenderedDOMComponentsWithTag(e,t);if(1!==n.length)throw new Error("Did not find exactly one match for tag:"+t);return n[0]},scryRenderedComponentsWithType:function(e,t){return ReactTestUtils.findAllInRenderedTree(e,function(e){return ReactTestUtils.isCompositeComponentWithType(e,t)})},findRenderedComponentWithType:function(e,t){var n=ReactTestUtils.scryRenderedComponentsWithType(e,t);if(1!==n.length)throw new Error("Did not find exactly one match for componentType:"+t);return n[0]},mockComponent:function(e,t){t=t||e.mockTagName||"div";var n=React.createClass({displayName:"ConvenienceConstructor",render:function(){return React.createElement(t,null,this.props.children)}});return e.mockImplementation(n),e.type=n.type,e.isReactLegacyFactory=!0,this},simulateNativeEventOnNode:function(e,t,n){n.target=t,ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(e,n)},simulateNativeEventOnDOMComponent:function(e,t,n){ReactTestUtils.simulateNativeEventOnNode(e,t.getDOMNode(),n)},nativeTouchData:function(e,t){return{touches:[{pageX:e,pageY:t}]}},Simulate:null,SimulateNative:{}},oldInjectEventPluginOrder=EventPluginHub.injection.injectEventPluginOrder;EventPluginHub.injection.injectEventPluginOrder=function(){oldInjectEventPluginOrder.apply(this,arguments),buildSimulators()};var oldInjectEventPlugins=EventPluginHub.injection.injectEventPluginsByName;EventPluginHub.injection.injectEventPluginsByName=function(){oldInjectEventPlugins.apply(this,arguments),buildSimulators()},buildSimulators();var eventType;for(eventType in topLevelTypes){var convenienceName=0===eventType.indexOf("top")?eventType.charAt(3).toLowerCase()+eventType.substr(4):eventType;ReactTestUtils.SimulateNative[convenienceName]=makeNativeSimulator(eventType)}module.exports=ReactTestUtils;
//# sourceMappingURL=ReactTestUtils.js.map