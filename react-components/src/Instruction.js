/** @jsx React.DOM */
var React = require("react");

var Instructions = require("data/Instructions"),
    Macros       = require("data/Macros");

/**
 * Props:
 *   type
 *     The unique identifier of the type of instruction or macro this component represents.
 *   macro
 *     true if this component represents a macro, false otherwise
 *   initialArgs
 *     A mapping of parameter names to their initial values
 */
var Instruction = React.createClass({
  getMeta: function() {
    return ( this.props.macro ? Macros : Instructions )[ this.props.type ];
  },

  render: function() {
    var contents = [ <Header data={ this.getMeta() } initialArgs={ this.props.initialArgs } /> ],
        macro = this.props.macro;
        //instruction = this.props.instruction,
        //type = instruction.type;

    if( macro ) {
      contents.push(<InstructionList />);
    }

    //console.log( instruction );
    
    /*contents.push(<span className="RegisterMachine-Instruction-Type">
      { typeNames[ type ] }
    </span>);
    
    // DEB and INC have 'which' and 'next' parameters
    if( type === RegisterMachine.DEB || type === RegisterMachine.INC ) {
      contents.push(<Parameter name="which" type="register" desc="This is a fake description." initialValue={ instruction.which + 1 } />);
      contents.push(<Parameter name="next"  type="instruction" initialValue={ instruction.next + 1 } />);
    }
    
    // only DEB has 'branch' parameter
    if( type === RegisterMachine.DEB ) {
      contents.push(<Parameter name="branch" type="instruction" initialValue={ instruction.branch + 1 } />);
    }*/

    return (<div className={"RegisterMachine-" + macro ? "Macro" : "Instruction"}>
      /*<div className="RegisterMachine-Instruction-Inner">
        { contents }
      </div>*/
      { contents }
    </div>);
  }
});

return window.i = Instruction;