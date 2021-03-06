/* */ 
"format cjs";
(function(process) {
  "use strict";
  var DOMPropertyOperations = require("./DOMPropertyOperations");
  var EventPluginUtils = require("./EventPluginUtils");
  var ReactChildren = require("./ReactChildren");
  var ReactComponent = require("./ReactComponent");
  var ReactCompositeComponent = require("./ReactCompositeComponent");
  var ReactContext = require("./ReactContext");
  var ReactCurrentOwner = require("./ReactCurrentOwner");
  var ReactElement = require("./ReactElement");
  var ReactElementValidator = require("./ReactElementValidator");
  var ReactDOM = require("./ReactDOM");
  var ReactDOMComponent = require("./ReactDOMComponent");
  var ReactDefaultInjection = require("./ReactDefaultInjection");
  var ReactInstanceHandles = require("./ReactInstanceHandles");
  var ReactLegacyElement = require("./ReactLegacyElement");
  var ReactMount = require("./ReactMount");
  var ReactMultiChild = require("./ReactMultiChild");
  var ReactPerf = require("./ReactPerf");
  var ReactPropTypes = require("./ReactPropTypes");
  var ReactServerRendering = require("./ReactServerRendering");
  var ReactTextComponent = require("./ReactTextComponent");
  var assign = require("./Object.assign");
  var deprecated = require("./deprecated");
  var onlyChild = require("./onlyChild");
  ReactDefaultInjection.inject();
  var createElement = ReactElement.createElement;
  var createFactory = ReactElement.createFactory;
  if ("production" !== process.env.NODE_ENV) {
    createElement = ReactElementValidator.createElement;
    createFactory = ReactElementValidator.createFactory;
  }
  createElement = ReactLegacyElement.wrapCreateElement(createElement);
  createFactory = ReactLegacyElement.wrapCreateFactory(createFactory);
  var render = ReactPerf.measure('React', 'render', ReactMount.render);
  var React = {
    Children: {
      map: ReactChildren.map,
      forEach: ReactChildren.forEach,
      count: ReactChildren.count,
      only: onlyChild
    },
    DOM: ReactDOM,
    PropTypes: ReactPropTypes,
    initializeTouchEvents: function(shouldUseTouch) {
      EventPluginUtils.useTouchEvents = shouldUseTouch;
    },
    createClass: ReactCompositeComponent.createClass,
    createElement: createElement,
    createFactory: createFactory,
    constructAndRenderComponent: ReactMount.constructAndRenderComponent,
    constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
    render: render,
    renderToString: ReactServerRendering.renderToString,
    renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
    unmountComponentAtNode: ReactMount.unmountComponentAtNode,
    isValidClass: ReactLegacyElement.isValidClass,
    isValidElement: ReactElement.isValidElement,
    withContext: ReactContext.withContext,
    __spread: assign,
    renderComponent: deprecated('React', 'renderComponent', 'render', this, render),
    renderComponentToString: deprecated('React', 'renderComponentToString', 'renderToString', this, ReactServerRendering.renderToString),
    renderComponentToStaticMarkup: deprecated('React', 'renderComponentToStaticMarkup', 'renderToStaticMarkup', this, ReactServerRendering.renderToStaticMarkup),
    isValidComponent: deprecated('React', 'isValidComponent', 'isValidElement', this, ReactElement.isValidElement)
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
      Component: ReactComponent,
      CurrentOwner: ReactCurrentOwner,
      DOMComponent: ReactDOMComponent,
      DOMPropertyOperations: DOMPropertyOperations,
      InstanceHandles: ReactInstanceHandles,
      Mount: ReactMount,
      MultiChild: ReactMultiChild,
      TextComponent: ReactTextComponent
    });
  }
  if ("production" !== process.env.NODE_ENV) {
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
          console.debug('Download the React DevTools for a better development experience: ' + 'http://fb.me/react-devtools');
        }
      }
      var expectedFeatures = [Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim, Object.create, Object.freeze];
      for (var i = 0; i < expectedFeatures.length; i++) {
        if (!expectedFeatures[i]) {
          console.error('One or more ES5 shim/shams expected by React are not available: ' + 'http://fb.me/react-warning-polyfills');
          break;
        }
      }
    }
  }
  React.version = '0.12.1';
  module.exports = React;
})(require("github:jspm/nodelibs@0.0.3/process"));
