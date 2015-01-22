/** @jsx React.DOM */
var React = require("react");
var Params = require("data/Parameters");

/**
 * Props:
 *   name  The name of the parameter, relative to its parent instruction or macro.
 *         This will be displayed next to the parameter's value.
 *   desc  The description of the parameter, indicating its meaning to its parent.
 *   type  The type of the parameter, responsible for determining what values are
 *         valid and how its value will be used
 */
var Parameter = React.createClass({displayName: 'Parameter',
  getInitialState: function() {
    return {
      value: this.props.initialValue || "",
      editing: false
    };
  },

  getValue: function() {
    return this.state.value;
  },

  getMeta: function() {
    return Params[ this.props.type ];
  },

  edit: function() {
    var input = $( this.refs.input.getDOMNode() );

    // start editing if not already, set input value as current value
    if( !this.state.editing ) {
      this.setState({ editing: true });
      input.val( this.state.value );
    }

    // then select the contents of the text box (delayed to allow update to finish)
    setTimeout( input.select.bind( input ), 1 );
  },

  save: function() {
    var newValue, 
        checker = this.getMeta().checker;
    
    // quit if not already editing
    if( !this.state.editing ) return;
    
    // use the new value if it is valid; otherwise use current value
    newValue = this.refs.input.getDOMNode().value;
    newValue = checker( newValue ) ? newValue : this.state.value;

    // set the new state
    this.setState({
      value: newValue,
      editing: false
    });

    // and focus the parameter
    $( this.getDOMNode() ).focus();
  },

  quit: function() {
    if( this.state.editing ) {
      this.setState({ editing: false });
    }
  },

  handleParameterKeyDown: function( event ) {
    // get the key
    var key = event.keyCode || event.which;

    // no bubbling
    event.stopPropagation();

    // if [enter] or [0-9], start editing
    if( key === 13 || ( key >= 48 && key <= 57 ) ) {
      this.edit();
    }
  },

  handleInputKeyDown: function( event ) {
    // get the key
    var key = event.keyCode || event.which;

    // no bubbling
    event.stopPropagation();

    // if [enter], try saving
    if( key === 13 ) {
      this.save();
    } else if( key === 27 ) {
      this.quit();
    }
  },

  render: function() {
    var state = this.state,
        props = this.props,
        meta = this.getMeta();

    return (React.DOM.div({className:  "RegisterMachine-Parameter" + ( state.editing ? " state-editing" : ""), 
                  tabIndex: "0", 
                  onKeyDown:  this.handleParameterKeyDown}, 
      React.DOM.span({className: "RegisterMachine-Parameter-Name"},  props.name), 
      React.DOM.span({className: "RegisterMachine-Parameter-Value", onClick:  this.edit}, 
        React.DOM.span({ref: "value", 
              style: { display: state.editing ? "none" : null}}, 
           state.value
        ), 
        React.DOM.input({ref: "input", 
               type: "text", 
               className: "RegisterMachine-Parameter-Input", 
               style: { display: state.editing ? null : "none"}, 
               onBlur:  this.quit, 
               onKeyDown:  this.handleInputKeyDown})
      ), 
      React.DOM.div({className: "RegisterMachine-Parameter-Meta"}, 
        React.DOM.p({className: "RegisterMachine-Parameter-Meta-Description"}, 
           props.desc
        ), 
        React.DOM.p({className: "RegisterMachine-Parameter-Meta-Type"}, 
           props.type
        ), 
        React.DOM.p({className: "RegisterMachine-Parameter-Meta-TypeDesc"}, 
           meta.description
        )
      )
    ));
  }
});

module.exports = Parameter;