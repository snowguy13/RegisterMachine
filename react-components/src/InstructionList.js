/** @jsx React.DOM */
var $               = require("jquery");
var React           = require("react");
var Header          = require("react:Header");
var Instruction     = require("react:Instruction");
var RegisterMachine = require("theory/RegisterMachine");

/*var typeNames = [
  "DEB", "INC", "END"
];

var Macro = React.createClass({
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
      return (<Parameter name={ varName } value={ values[ varName ] } />);
    });

    // prepend the macro name
    contents.unshift(<span className="RegisterMachine-Macro-Name">
      { macro.name }
    </span>);

    return (<div ref="root" className="RegisterMachine-Macro">
      <div className="RegisterMachine-Macro-Header" onClick={ this.toggleExpanded }>
        <span className="RegisterMachine-Macro-Header-Inner">{ contents }</span>
      </div>
      <InstructionList ref="list" instructions={ macro.templates } />
    </div>);
  }
});*/

/**
 * Props:
 *   initialInstructions
 *     A list of objects defining the initial set of instructions to be displayed
 *     in this list. Each object should be of the format:
 *       {
 *         type: ("Macro:")? "[a-zA-z]"+
 *         args: an object mapping parameters to their initial used values
 *       }
 */
var InstructionList = React.createClass({
  getInitialState: function() {
    return {
      instructions: this.props.initialInstructions
    };
  },

  render: function() {
    var contents,
        instructions = this.state.instructions;
    
    contents = instructions.map(function( current ) {
      

      return (<Instruction />);
    });

    return (<div className="RegisterMachine-InstructionList">
      { contents }
    </div>);
  }
});

module.exports = InstructionList;