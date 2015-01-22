var Type = require("util/Type");
var Params = require("data/Parameters");

var capitalize = function( string ) {
  return string.substring( 0, 1 ).toUpperCase() + string.substring( 1 );
};

var check = function( types ) {
  var data, params, param;

  for( var shortName in types ) {
    data = types[ shortName ];
    
    // copy the short name
    data.shortName = shortName;

    // create a long name if necessary
    if( !Type.isString( data.fullName ) ) {
      data.fullName = capitalize( shortName );
    }

    // a description is required
    if( !Type.isString( data.description ) ) {
      throw new Error("Issue checking instruction type '" + shortName + "': description is required and wasn't given");
    }

    // check the parameters if given, assume none if not
    if( params = data.parameters ) {
      for( var paramName in params ) {
        param = params[ paramName ];
        
        // name, type, and description are required
        if( !( Type.isString( param.name ) && Type.isString( param.type ) && Type.isString( param.description ) ) ) {
          throw new Error("Issue checking the parameter '" + paramName + "' of instruction type '" + shortName + "': name, type, and description are required, at least one was missing");
        }

        // ensure the param type exists -- reset the "type" property
        // to a reference to that type's info
        if( !( param.type = Params[ param.type ] ) ) {
          throw new Error("");
        }
      }
    } else {
      data.parameters = {};
    }

    // run() is required
    if( !Type.isFunction( data.run ) ) {
      throw new Error("Issue checking instruction type '" + shortName + "': run function is required and wasn't given");
    }
  }

  return types;
};

module.exports = check({
  "end": {
    "description": "Ends the program.",
    "run": function() {
      return -1; // indicates no next step
    }
  },

  "inc": {
    "fullName": "Increment",
    "description": "Increments the register indicated by [which], then runs instruction [next].",
    "parameters": [
      {
        "name": "which",
        "type": "register",
        "description": "The register to increment"
      },

      {
        "name": "next",
        "type": "instruction",
        "description": "The instruction to run after the current one"
      }
    ],

    "run": function() {
      // increment the register 
      this.registers[ this.args.which ]++;

      // return the next step
      return this.args.next;
    }
  },

  "deb": {
    "fullName": "Decrement or branch",
    "description": "Decrements the register indicated by [which], if possible. If successful, instruction [next] is ran next; "
                 + "otherwise, instruction [branch] is ran next.",
    "parameters": [
      {
        "name": "which",
        "type": "register",
        "description": "The register to decrement, if possible"
      },

      {
        "name": "next",
        "type": "instruction",
        "description": "The instruction to run after the current one if the indicated register [which] isn't empty"
      },

      {
        "name": "branch",
        "type": "instruction",
        "description": "The instruction to run next if the indicated register [which] is empty"
      }
    ],

    "run": function() {
      var which = this.args.which;

      if( this.registers[ which ] ) {
        // if the register isn't empty, decrement
        this.registers[ which ]--;
        return this.args.next;
      } else {
        // else, return the branch step
        return this.args.branch;
      }
    }
  }
});