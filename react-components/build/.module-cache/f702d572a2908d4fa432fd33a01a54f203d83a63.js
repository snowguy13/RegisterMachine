/** @jsx React.DOM */
var React = require("react");
var $ = require("jquery")
var RM = require("theory:RegisterMachine");
var InstructionList = require("react:InstructionList");
var RegisterMachineExplorer = require("react:RegisterMachineExplorer");

var i = [
  new RM.Instruction( RM.DEB, 12312, 1, 3 ),
  new RM.Instruction( RM.INC, 1, 2 ),
  new RM.Instruction( RM.INC, 2, 0 ),
  new RM.Macro( "Test Macro", [], [
    new RM.Instruction( RM.DEB, 0, 1, 3 ),
    new RM.Macro( "An Inner Macro", [], [
      new RM.Instruction( RM.DEB, 0, 1, 3 ),
      new RM.Instruction( RM.INC, 1, 2 )
    ]),
    new RM.Instruction( RM.INC, 1, 2 )
  ]),
  new RM.Instruction( RM.END )
];

$(function() {
  /*React.render(
    <InstructionList instructions={ i } />,
    document.body
  );*/

  React.render(
    RegisterMachineExplorer({initialInstructions: i }),
    document.getElementById("app-root")
  );
});