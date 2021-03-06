/* */ 
"format cjs";
(function(process) {
  "use strict";
  var ReactPropTypes = require("./ReactPropTypes");
  var invariant = require("./invariant");
  var hasReadOnlyValue = {
    'button': true,
    'checkbox': true,
    'image': true,
    'hidden': true,
    'radio': true,
    'reset': true,
    'submit': true
  };
  function _assertSingleLink(input) {
    ("production" !== process.env.NODE_ENV ? invariant(input.props.checkedLink == null || input.props.valueLink == null, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(input.props.checkedLink == null || input.props.valueLink == null));
  }
  function _assertValueLink(input) {
    _assertSingleLink(input);
    ("production" !== process.env.NODE_ENV ? invariant(input.props.value == null && input.props.onChange == null, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(input.props.value == null && input.props.onChange == null));
  }
  function _assertCheckedLink(input) {
    _assertSingleLink(input);
    ("production" !== process.env.NODE_ENV ? invariant(input.props.checked == null && input.props.onChange == null, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(input.props.checked == null && input.props.onChange == null));
  }
  function _handleLinkedValueChange(e) {
    this.props.valueLink.requestChange(e.target.value);
  }
  function _handleLinkedCheckChange(e) {
    this.props.checkedLink.requestChange(e.target.checked);
  }
  var LinkedValueUtils = {
    Mixin: {propTypes: {
        value: function(props, propName, componentName) {
          if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
            return;
          }
          return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
        },
        checked: function(props, propName, componentName) {
          if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
            return;
          }
          return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
        },
        onChange: ReactPropTypes.func
      }},
    getValue: function(input) {
      if (input.props.valueLink) {
        _assertValueLink(input);
        return input.props.valueLink.value;
      }
      return input.props.value;
    },
    getChecked: function(input) {
      if (input.props.checkedLink) {
        _assertCheckedLink(input);
        return input.props.checkedLink.value;
      }
      return input.props.checked;
    },
    getOnChange: function(input) {
      if (input.props.valueLink) {
        _assertValueLink(input);
        return _handleLinkedValueChange;
      } else if (input.props.checkedLink) {
        _assertCheckedLink(input);
        return _handleLinkedCheckChange;
      }
      return input.props.onChange;
    }
  };
  module.exports = LinkedValueUtils;
})(require("github:jspm/nodelibs@0.0.3/process"));
