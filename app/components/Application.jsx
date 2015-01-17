var React = require('react');
var Navigation = require('./Navigation.jsx');

var Application = React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div><Navigation/></div>
      </div>
    );
  }
});

module.exports = Application;
