/** @jsx React.DOM */
var React = require("react");
var Params = require("data/Parameters");

/**
 * Props:
 *   name  
 *         The name of the parameter, relative to its parent instruction or macro.
 *         This will be displayed next to the parameter's value.
 *   description  
 *         The description of the parameter, indicating its meaning to its parent.
 *   type  
 *         The type of the parameter, responsible for determining what values are
 *         valid and how its value will be used
 *   initialValue
 *         The value to use initially for this parameters
 */
var Parameter = React.createClass({
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

    return (<div className={ "RegisterMachine-Parameter" + ( state.editing ? " state-editing" : "" ) } 
                  tabIndex="0" 
                  onKeyDown={ this.handleParameterKeyDown }>
      <span className="RegisterMachine-Parameter-Name">{ props.name }</span>
      <span className="RegisterMachine-Parameter-Value" onClick={ this.edit }>
        <span ref="value" 
              style={{ display: state.editing ? "none" : null }}>
          { state.value }
        </span>
        <input ref="input" 
               type="text" 
               className="RegisterMachine-Parameter-Input"
               style={{ display: state.editing ? null : "none" }}
               onBlur={ this.quit }
               onKeyDown={ this.handleInputKeyDown } />
      </span>
      <div className="RegisterMachine-Parameter-Meta">
        <p className="RegisterMachine-Parameter-Meta-Description">
          { props.description }
        </p>
        <p className="RegisterMachine-Parameter-Meta-Type">
          { props.type }
        </p>
        <p className="RegisterMachine-Parameter-Meta-TypeDesc">
          { meta.description }
        </p>
      </div>
    </div>);
  }
});

module.exports = Parameter;