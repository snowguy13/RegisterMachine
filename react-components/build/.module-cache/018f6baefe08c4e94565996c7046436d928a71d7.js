var React = require("react");
var Params = require("data/Parameters");

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

  edit: function() {
    var input = $( this.refs.input.getDOMNode() );

    // start editing if not already, set input value as current value
    if( !this.state.editing ) {
      this.setState({ editing: true });
      input.val( this.state.value );
    }

    // then select the contents of the text box
    setTimeout( input.select.bind( input ), 1 );
  },

  save: function() {
    var newValue;
    
    // quit if not already editing
    if( !this.state.editing ) return;

    // get the value in the text field as a positive integer
    newValue = toPositiveInteger( this.refs.input.getDOMNode().value );

    // set as the new value if it's valid (otherwise reuse current value)
    newValue = newValue || this.state.value;

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
    return (<span className={ "RegisterMachine-Parameter" + ( this.state.editing ? " state-editing" : "" ) } 
                  tabIndex="0" 
                  onKeyDown={ this.handleParameterKeyDown }>
      <span className="RegisterMachine-Parameter-Name">{ this.props.name }</span>
      <span className="RegisterMachine-Parameter-Value" onClick={ this.edit }>
        <span ref="value" 
              style={{ display: this.state.editing ? "none" : null }}>
          { this.state.value }
        </span>
        <input ref="input" 
               type="text" 
               className="RegisterMachine-Parameter-Input"
               style={{ display: this.state.editing ? null : "none" }}
               onBlur={ this.quit }
               onKeyDown={ this.handleInputKeyDown } />
      </span>
    </span>);
  }
});

module.exports = Parameter;