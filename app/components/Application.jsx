var React = require('react');

var Application = React.createClass({
  render: function() {
    return <div>{this.props.title}</div>;
  }
});

module.exports = Application;
