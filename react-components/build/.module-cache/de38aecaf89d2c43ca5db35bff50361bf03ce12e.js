/** @jsx React.DOM */
var $               = require("jquery");
var React           = require("react");
var RegisterMachine = require("theory:RegisterMachine");

var typeNames = [
  "DEB", "INC", "END"
];

var toPositiveInteger = function( input ) {
  input = +input;

  // not a number or 0 || less than 0 || not an integer
  if( !input || input < 0 || input % 1 !== 0 ) {
    return false;
  } else {
    return input;
  }
}

var Parameter = React.createClass({displayName: 'Parameter',
  getInitialState: function() {
    return {
      value: this.props.initialValue,
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

    // if [enter], start editing
    if( key === 13 ) {
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
      alert("Saving...");
      this.save();
    } else if( key === 27 ) {
      this.quit();
    }
  },

  render: function() {
    return (React.DOM.span({className:  "RegisterMachine-Parameter" + ( this.state.editing ? " state-editing" : ""), 
                  tabIndex: "0", 
                  onKeyDown:  this.handleParameterKeyDown}, 
      React.DOM.span({className: "RegisterMachine-Parameter-Name"},  this.props.name), 
      React.DOM.span({className: "RegisterMachine-Parameter-Value", onClick:  this.edit}, 
        React.DOM.span({ref: "value", 
              style: { display: this.state.editing ? "none" : ""}}, 
           this.state.value
        ), 
        React.DOM.input({ref: "input", 
               type: "text", 
               className: "RegisterMachine-Parameter-Input", 
               style: { display: this.state.editing ? "" : "none"}, 
               onBlur:  this.quit})
      )
    ));
  }
});

var Instruction = React.createClass({displayName: 'Instruction',
  render: function() {
    var contents = [],
        instruction = this.props.instruction,
        type = instruction.type;

        console.log( instruction );

    contents.push(React.DOM.span({className: "RegisterMachine-Instruction-Type"}, 
       typeNames[ type] 
    ));
    
    // DEB and INC have 'which' and 'next' parameters
    if( type === RegisterMachine.DEB || type === RegisterMachine.INC ) {
      contents.push(Parameter({name: "which", initialValue:  instruction.which + 1}));
      contents.push(Parameter({name: "next", initialValue:  instruction.next + 1}));
    }
    
    // only DEB has 'branch' parameter
    if( type === RegisterMachine.DEB ) {
      contents.push(Parameter({name: "branch", initialValue:  instruction.branch + 1}));
    }

    return (React.DOM.div({className: "RegisterMachine-Instruction"}, 
      React.DOM.span({className: "RegisterMachine-Instruction-Inner"}, 
        contents 
      )
    ));
  }
});

var Macro = React.createClass({displayName: 'Macro',
  getInitialState: function() {
    return { values: {} };
  },

  toggleExpanded: function() {
    $( this.refs.root.getDOMNode() ).toggleClass("expanded");
  },

  render: function() {
    var contents,
        macro = this.props.macro
        values = this.state.values;
    
    // add all the arguments to the list
    contents = macro.varNames.map(function( varName ) {
      return (Parameter({name: varName, value:  values[ varName] }));
    });

    // prepend the macro name
    contents.unshift(React.DOM.span({className: "RegisterMachine-Macro-Name"}, 
       macro.name
    ));

    return (React.DOM.div({ref: "root", className: "RegisterMachine-Macro"}, 
      React.DOM.div({className: "RegisterMachine-Macro-Header", onClick:  this.toggleExpanded}, 
        React.DOM.span({className: "RegisterMachine-Macro-Header-Inner"}, contents )
      ), 
      InstructionList({ref: "list", instructions:  macro.templates})
    ));
  }
});

var InstructionList = React.createClass({displayName: 'InstructionList',
  render: function() {
    var contents,
        instructions = this.props.instructions;
    
    contents = instructions.map(function( current ) {
      if( current instanceof RegisterMachine.Macro ) {
        // create a sub-list for this macro's steps
        return (Macro({macro: current }));
      } else {
        // create a simple instruction
        return (Instruction({instruction: current }));
      }
    });

    return (React.DOM.div({className: "RegisterMachine-InstructionList"}, 
      contents 
    ));
  }
});

module.exports = InstructionList;