/* */
"format cjs";"use strict";function getCurrentOwnerDisplayName(){var e=ReactCurrentOwner.current;return e&&e.constructor.displayName||void 0}function validateExplicitKey(e,t){e._store.validated||null!=e.key||(e._store.validated=!0,warnAndMonitorForKeyUse("react_key_warning",'Each child in an array should have a unique "key" prop.',e,t))}function validatePropertyKey(e,t,n){NUMERIC_PROPERTY_REGEX.test(e)&&warnAndMonitorForKeyUse("react_numeric_key_warning","Child objects should have non-numeric keys so ordering is preserved.",t,n)}function warnAndMonitorForKeyUse(e,t,n,r){var o=getCurrentOwnerDisplayName(),a=r.displayName,i=o||a,s=ownerHasKeyUseWarning[e];if(!s.hasOwnProperty(i)){s[i]=!0,t+=o?" Check the render method of "+o+".":" Check the renderComponent call using <"+a+">.";var u=null;n._owner&&n._owner!==ReactCurrentOwner.current&&(u=n._owner.constructor.displayName,t+=" It was passed a child from "+u+"."),t+=" See http://fb.me/react-warning-keys for more information.",monitorCodeUse(e,{component:i,componentOwner:u}),console.warn(t)}}function monitorUseOfObjectMap(){var e=getCurrentOwnerDisplayName()||"";ownerHasMonitoredObjectMap.hasOwnProperty(e)||(ownerHasMonitoredObjectMap[e]=!0,monitorCodeUse("react_object_map_children"))}function validateChildKeys(e,t){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];ReactElement.isValidElement(r)&&validateExplicitKey(r,t)}else if(ReactElement.isValidElement(e))e._store.validated=!0;else if(e&&"object"==typeof e){monitorUseOfObjectMap();for(var o in e)validatePropertyKey(o,e[o],t)}}function checkPropTypes(e,t,n,r){for(var o in t)if(t.hasOwnProperty(o)){var a;try{a=t[o](n,o,e,r)}catch(i){a=i}a instanceof Error&&!(a.message in loggedTypeFailures)&&(loggedTypeFailures[a.message]=!0,monitorCodeUse("react_failed_descriptor_type_check",{message:a.message}))}}var ReactElement=require("./ReactElement"),ReactPropTypeLocations=require("./ReactPropTypeLocations"),ReactCurrentOwner=require("./ReactCurrentOwner"),monitorCodeUse=require("./monitorCodeUse"),ownerHasKeyUseWarning={react_key_warning:{},react_numeric_key_warning:{}},ownerHasMonitoredObjectMap={},loggedTypeFailures={},NUMERIC_PROPERTY_REGEX=/^\d+$/,ReactElementValidator={createElement:function(e){var t=ReactElement.createElement.apply(this,arguments);if(null==t)return t;for(var n=2;n<arguments.length;n++)validateChildKeys(arguments[n],e);var r=e.displayName;return e.propTypes&&checkPropTypes(r,e.propTypes,t.props,ReactPropTypeLocations.prop),e.contextTypes&&checkPropTypes(r,e.contextTypes,t._context,ReactPropTypeLocations.context),t},createFactory:function(e){var t=ReactElementValidator.createElement.bind(null,e);return t.type=e,t}};module.exports=ReactElementValidator;
//# sourceMappingURL=ReactElementValidator.js.map