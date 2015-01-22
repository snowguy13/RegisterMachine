/** @jsx React.DOM */
var React = require("react");
var InstructionList = require("react:InstructionList");

var RegisterMachineExplorer = React.createClass({
  getInitialState: function() {
    return {
      registers: [],
      instructions: this.props.initialInstructions || [],
      currentInstruction: -1,
      playing: false,
      interval: 1000
    };
  },

  render: function() {
    return (<div className="RegisterMachine">
      <div /** placeholder */ className="register-display-placeholder" />
      <InstructionList instructions={ this.state.instructions } />
    </div>);
  }
});

module.exports = RegisterMachineExplorer;