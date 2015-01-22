var Type = require("util/Type");

var isPositiveInteger = function( thing ) {
  if( isNaN( thing ) ) return false;

  thing = +thing;

  return thing > 0 & thing % 1 === 0;
};

var check = function( types ) {
  var data;

  for( var typeName in types ) {
    data = types[ typeName ];
    
    // description and checker are required
    if( !Type.isString( data.description ) ) {
      throw new Error("Issue checking parameter type '" + typeName + "': description is required and wasn't given");
    }

    if( !Type.isFunction( data.checker ) ) {
      throw new Error("Issue checking parameter type '" + typeName + "': checker is required and wasn't given");
    }

    // fill in the name property
    data.name = typeName;
  }

  return types;
};

// eventually, this may be edited to allow other parameter types
module.exports = check({
  "register": {
    "description": "A positive integer referring to a register in the machine.",
    "checker": isPositiveInteger
  },

  "instruction": {
    "description": "A positive integer referring to another instruction in this list.",
    "checker": isPositiveInteger
  }
});