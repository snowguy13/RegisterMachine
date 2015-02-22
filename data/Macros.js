var DEFAULT_NEXT_PARAM = {
  "name": "next",
  "type": "instruction",
  "description": "The instruction to run after this one finishes"
};

var PREDEFINED = [
  {
    "shortName":   "EMPTY",
    "description": "Empties the register indicated by [which], then runs instruction [next].",
    "parameters": [
      {
        "name": "which",
        "type": "register",
        "description": "The register to empty"
      },

      "next"
    ],

    "instructions": [
      [ "deb", "which", 0, 1 ],
      [ "done", "next" ]
    ]
  },

  {
    "shortName":   "MOVE",
    "description": "Moves the contents of register [source] to the register(s) [destination], "
                 + "then runs instruction [next]. [source] will be empty after this executes.",
    "parameters": [
      {
        "name": "source",
        "type": "register",
        "description": "The register whose contents should be moved"
      },

      {
        "name": "destination",
        "type": "register+",
        "description": "The register(s) whose contents should be overwritten by the moved data"
      },

      "next" // including the literal string "next" automatically expands to DEFAULT_NEXT_PARAM above
    ],

    "instructions": function( source, destination, next ) {
      var count = 0, 
          incs = destination.map(function( dest ) {
        return [ "inc", dest, ++count === destination.length ? 0 : count + 1 ];
      });

      return [[ "deb", source, 1, destination.length + 1 ]]
        .concat( incs )
        .concat([[ "done", next ]]);
    }
  },

  {
    "shortName":   "COPY",
    "description": "Copies the contents of register [source] to register [destination] "
                 + "(preserving the contents of [source]), then runs instruction [next].",
    "parameters": [
      {
        "name": "source",
        "type": "register",
        "description": "The register whose contents should be copied"
      },

      {
        "name": "destination",
        "type": "register+",
        "description": "The register whose contents should be overwritten by the copied data"
      },

      "next" // including the literal string "next" automatically expands to DEFAULT_NEXT_PARAM above
    ],

    "instructions": [
      [ "Move", "source",  [ "auto[0]", "destination" ], 1 ], // Move [source] to [destination] and some unused register
      [ "Move", "auto[0]", "source", 2 ],                     // Move the unused register back to [source]
      [ "done", "next" ]                                      // Exit out to the 
    ]
  }
];

// capitalizes first letter AND lower-cases all the rest
var capitalize = function( text ) {
  return text.substring( 0, 1 ).toUpperCase() + text.substring( 1 ).toLowerCase();
};

var isArray = Array.isArray;

var Macro = function( data ) {
  var params, index;

  // fill in non-required information
  if( !data.fullName ) {
    data.fullName = capitalize( data.shortName );
  }
  
  params = data.parameters;
  if( !params ) {
    // nonexistant, so make empty array
    data.parameters = [];
  } else if( (index = params.indexOf( "next" )) !== -1 ) {
    // fill in default "next" parameter if necessary
    params[ index ] = DEFAULT_NEXT_PARAM;
  }

  // public reference to data
  this.data = data;
};

Macro.prototype = {
  resolveInstructions: function( /* arg0, arg1, ..., argn */ ) {
    var instructions = this.data.instructions,
        outerArgs = arguments, args, 
        resolve;

    if( isArray( instructions ) ) {
      // Go through the array, replacing parameter names with argument values
      // First, create a map from names to values
      args = {};
      this.data.parameters.forEach(function( paramData, index ) {
        args[ paramData.name ] = outerArgs[ index ];
      });

      // Simple function to map param names to values, but not "auto[n]" constructs
      resolve = function( name ) {
        return args[ name ] || name;
      }; 

      // Map the instructions to their replaced value versions
      instructions = instructions.map(function( instruction ) {
        return instruction.map(function( part, index ) {
          var ret;

          if( index === 0 ) {
            // First element, just copy instruction name or id
            ret = resolve( part );
          } else {
            // Second and onward
            if( isArray( part ) ) {
              // Array, map all items and flatten
              ret = part.reduce(function( array, item ) {
                return array.concat( resolve( item ) );
              }, []);
            } else if( typeof part === "string" ) {
              // Single string, simple map
              ret = resolve( part );
            } else {
              // will be a number, just return it
              ret = part;
            }
          }

          return ret;
        });
      });
    } else /* it will be a function */ {
      // Otherwise, just apply the function to receive the instructions
      instructions = instructions.apply( undefined, arguments );
    }

    return instructions;
  }
};

var Macros;


return Macros;