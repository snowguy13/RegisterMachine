/** @jsx React.DOM */
var React = require("react");
var InstructionList = require("react:InstructionList");

var RegisterMachineExplorer = React.createClass({displayName: 'RegisterMachineExplorer',
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
    return (React.DOM.div({className: "RegisterMachine"}, 
      React.DOM.div({/** placeholder */ className: "register-display-placeholder"}), 
      InstructionList({instructions:  this.state.instructions})
    ));
  }
});

module.exports = RegisterMachineExplorer;