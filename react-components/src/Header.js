/** @jsx React.DOM */
var React = require("react");

/**
 * Props:
 *   data  The meta data corresponding to the Header's parent
 *         Instruction's (or Macro's) type. Data is assumed to
 *         contain the properties shortName, fullName, description,
 *         and parameters. Additional properties are ignored.
 *   initialArgs
 *         The initial arguments to be displayed in the header
 */
var Header = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      "shortName":   React.PropTypes.string.isRequired,
      "fullName":    React.PropTypes.string.isRequired,
      "description": React.PropTypes.string.isRequired,
      "parameters":  React.PropTypes.objectOf( React.PropTypes.string ).isRequired
    }).isRequired,

    initialArgs: React.PropTypes.
  },

  getArguments: function() {
    var refs = this.refs;

    return Object.keys( this.refs ).reduce(function( map, key ) {
      map[ key ] = refs[ key ].getValue();
    }, {});
  },

  // stateless
  render: function() {
    var contents = [],
        data = this.props.data,
        initArgs = this.props.initialArgs;
    
    // the short name of the header
    contents.push(<span className="RegisterMachine-Header-Name">
      { data.shortName }
    </span>);

    // the parameters
    data.parameters.forEach(function( paramData ) {
      var name = paramData.name;

      contents.push(<Parameter {...paramData}
                               initialValue={ initArgs[ name ] }
                               ref={ name } />);
    });

    // put it all together
    return (<div className="Header">
      { contents }
    </div>);
  }
});

module.exports = Header;