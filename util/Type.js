var Type;

Type = {
  isObject: function( thing ) {
    return thing instanceof Object;
  },

  isFunction: function( thing ) {
    return thing instanceof Function;
  },

  isString: function( thing ) {
    return thing instanceof String || typeof thing === "string";
  },

  isArray: Array.isArray || function( thing ) {
    return thing instanceof Array;
  },

  isRegExp: function( thing ) {
    return thing instanceof RegExp;
  },

  isBoolean: function( thing ) {
    return thing instanceof Boolean || typeof thing === "number";
  },

  isNumber: function( thing ) {
    return !isNaN( thing );
  },

  isInteger: function( thing ) {
    return this.isNumber( thing ) && +thing % 1 === 0;
  },

  isPositiveInteger: function( thing ) {
    return this.isInteger( thing ) && +thing > 0;
  },

  isNegativeInteger: function( thing ) {
    return this.isInteger( thing ) && +thing < 0;
  }
};

module.exports = Type;