/** @jsx React.DOM */
var $               = require("jquery");
var React           = require("react");
var RegisterMachine = require("theory:RegisterMachine");

var typeNames = [
  "DEB", "INC", "END"
];

var Parameter = React.createClass({displayName: 'Parameter',
  render: function() {
    return (React.DOM.span({className: "RegisterMachine-Instruction-Parameter", 
                 'data-name':  this.props.name, 'data-value':  this.props.value}, 
       this.props.value
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
      contents.push(Parameter({name: "which", value:  instruction.which}));
      contents.push(Parameter({name: "next", value:  instruction.next}));
    }
    
    // only DEB has 'branch' parameter
    if( type === RegisterMachine.DEB ) {
      contents.push(Parameter({name: "branch", value:  instruction.branch}));
    }

    return (React.DOM.div({className: "RegisterMachine-Instruction"}, 
      React.DOM.span({className: "RegisterMachine-Instruction-Inner"}, 
        contents 
      )
    ));
  }
});

/*var showOrHide = function( jqNode, show ) {
  //alert("Doing stuff now");
  jqNode
    .stop()
    [ show ? "slideDown" : "slideUp" ]( 300 );
}*/

var Macro = React.createClass({displayName: 'Macro',
  getInitialState: function() {
    return { values: {} };
  },

  toggleExpanded: function() {
    $( this.refs.root.getDOMNode() ).toggleClass("expanded");
  },

  /*showInstructions: function() {
    var jqNode = $( this.refs.list.getDOMNode() );

    if( !jqNode.hasClass("expanded") ) {
      showOrHide( jqNode, true );
    }
  },

  hideInstructions: function() {
    var jqNode = $( this.refs.list.getDOMNode() );

    if( !jqNode.hasClass("expanded") ) {
      showOrHide( jqNode, false );
    }
  },*/

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

    return (React.DOM.div({ref: "root", className: "RegisterMachine-Macro"/*onMouseEnter={ this.showInstructions } onMouseOut={ this.hideInstructions }*/}, 
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