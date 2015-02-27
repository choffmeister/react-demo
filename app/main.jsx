var React = require('react');

var ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    RouteHandler = ReactRouter.RouteHandler,
    DefaultRoute = ReactRouter.DefaultRoute;

var App = require('./components/App.jsx'),
    Home = require('./components/Home.jsx'),
    About = require('./components/About.jsx');

var routes = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute handler={Home}/>
    <Route name="home" handler={Home} path="/"/>
    <Route name="about" handler={About}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
