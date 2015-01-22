/** @jsx React.DOM */
var React = require("react");

/**
 * Props:
 *   data  The meta data corresponding to the Header's parent
 *         Instruction's (or Macro's) type. Data is assumed to
 *         contain the properties shortName, fullName, description,
 *         and parameters. Additional properties are ignored.
 */
var Header = React.createClass({displayName: 'Header',
  getArguments: function() {
    var refs = this.refs;

    return Object.keys( this.refs ).reduce(function( map, key ) {
      map[ key ] = refs[ key ].getValue();
    }, {});
  },

  // stateless
  render: function() {
    var contents = [],
        data = this.props.data;
    
    // the short name of the header
    contents.push(React.DOM.span({className: "RegisterMachine-Header-Name"}, 
       data.shortName
    ));

    // the parameters
    data.parameters.forEach(function( paramData ) {
      contents.push(Parameter(Object.assign({}, paramData, {ref:  paramData.name})));
    });

    // put it all together
    return (React.DOM.div({className: "Header"}, 
      contents 
    ));
  }
});

module.exports = Header;