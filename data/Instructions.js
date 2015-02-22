module.exports = [
  {
    "shortName":   "end",
    "fullName":    "End",
    "description": "Ends the program.",
    "run": function() {
      return -1; // indicates no next step
    }
  },

  {
    "shortName":   "inc",
    "fullName":    "Increment",
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
        "description": "The instruction to run after this one finishes"
      }
    ],

    "run": function() {
      // increment the register 
      this.registers[ this.args.which ]++;

      // return the next step
      return this.args.next;
    }
  },

  {
    "shortName":   "deb"
    "fullName":    "Decrement or branch",
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
];