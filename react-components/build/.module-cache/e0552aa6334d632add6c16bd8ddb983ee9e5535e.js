/** @jsx React.DOM */

var React           = require("react");
var RegisterMachine = require("theory:RegisterMachine");

var typeNames = [
  "DEB", "INC", "END"
];

var Parameter = React.createClass({displayName: 'Parameter',
  render: function() {
    return (React.DOM.span({className: "RegisterMachine-Instruction-Parameter", 
                 data: { name: this.props.name, value: this.props.value}}, 
       this.props.value
    ));
  }
});

var Instruction = React.createClass({displayName: 'Instruction',
  render: function() {
    var contents = [],
        instruction = this.props.instruction,
        type = instruction.type;

    contents.push(React.DOM.span({className: "RegisterMachine-Instruction-Type"}, 
       typeNames[ type] 
    ));
    
    // DEB and INC have 'which' and 'next' parameters
    if( type === RegisterMachine.DEB || type === RegisterMachine.INC ) {
      contents.push(Parameter({name: "which", value:  instruction.which}));
      contents.push(Parameter({name: "next", value:  instruction.next}));
    }
    
    // only DEB has 'branch' parameter
    if( type === RegisterMachine.DEB ) {
      contents.push(Parameter({name: "branch", value:  instruction.branch}));
    }

    return (React.DOM.div({className: "RegisterMachine-Instruction"}, 
      contents 
    ));
  }
});

var Macro = React.createClass({displayName: 'Macro',
  getInitialState: function() {
    return { values: {} };
  },

  render: function() {
    var contents,
        macro = this.props.macro
        values = this.state.values;
    
    // add all the arguments to the list
    contents = macro.vars.map(function( varName ) {
      return (Parameter({name: varName, value:  values[ varName] }));
    });

    // prepend the macro name
    contents.unshift(React.DOM.span({className: "RegisterMachine-Macro-Name"}, 
       typeNames[ type] 
    ));

    return (React.DOM.div({class: "RegisterMachine-Macro"}, 
      React.DOM.div({class: "RegisterMachine-Macro-Header"}, contents ), 
      InstructionList({ref: "list", instructions:  macro.templates})
    ));
  }
});

var InstructionList = React.createClass({displayName: 'InstructionList',
  render: function() {
    var contents,
        instructions = this.props.instructions,
        current;
    
    contents = instructions.map(function( current ) {
      if( current instanceof RegisterMachine.Macro ) {
        // create a sub-list for this macro's steps
        contents.push(Macro({macro: current }));
      } else {
        // create a simple instruction
        contents.push(Instruction({instruction: current }));
      }
    });

    return (React.DOM.div({className: "RegisterMachine-InstructionList"}, 
      contents 
    ));
  }
});

module.exports = InstructionList;