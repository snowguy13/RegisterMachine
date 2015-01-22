var DEB = 0,
    INC = 1,
    END = 2;

var instructionFunctions = [
  function instructionDEB( registers ) {
    var available = !!registers[ this.which ];

    if( available ) registers[ this.which ]--;

    return available ? this.next : this.branch;
  },

  function instructionINC( registers ) {
    registers[ this.which ]++;

    return this.next;
  },

  function instructionEND() {
    return -1;
  }
];

var Instruction = function Instruction( type, which, next, branch ) {
  this.type = type;
  this.run = instructionFunctions[ type ];
  this.which = which;
  this.next = next;
  this.branch = branch;
};

var runProgram = function runProgram( instructions, registers, start ) {
  var next = start || 0;

  while( next != -1 ) {
    next = instructions[ next ].run( registers );
  }

  return registers;
};

var Macro = function Macro( name, varNames, templates ) {
  this.name = name;
  this.varNames = varNames;
  this.templates = templates;
};

Macro.prototype = {
  run: function( values, registers ) {
    runProgram( this.templates.map(function( template ) {
      return new Instruction( 
        template[ 0 ], 
        typeof template[ 1 ] === "number" ? template[ 1 ] : values[ template[ 1 ] ], 
        template[ 2 ], 
        template[ 3 ]
      );
    }), registers );
  }
};

Instruction.isValidType = function( type ) {
  return type == DEB || type == INC || type == END;
};

module.exports = {
  DEB: DEB,
  INC: INC,
  END: END,
  Instruction: Instruction,
  Macro: Macro,
  runProgram: runProgram
};