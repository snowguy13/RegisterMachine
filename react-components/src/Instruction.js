/** @jsx React.DOM */
var React = require("react");

var Instructions = require("data/Instructions");

var Instruction = React.createClass({
  getMeta: function() {
    return Instructions[ this.props.type ];
  },

  render: function() {
    var contents = [];
        //instruction = this.props.instruction,
        //type = instruction.type;

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

    return (<div className="RegisterMachine-Instruction">
      /*<div className="RegisterMachine-Instruction-Inner">
        { contents }
      </div>*/
      <Header data={ this.getMeta() } />
    </div>);
  }
});

return Instruction;