var React = require('react'),
    ReactRouter = require('react-router'),
    Navigation = require('./Navigation.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation brand="react-demo"/>
        <div className="container">
          <ReactRouter.RouteHandler/>
        </div>
        <pre>{this.props.data}</pre>
      </div>
    );
  }
});

module.exports = App;
