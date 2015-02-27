var React = require('react');

var ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    RouteHandler = ReactRouter.RouteHandler,
    DefaultRoute = ReactRouter.DefaultRoute;

var App = require('./components/App.jsx'),
    Home = require('./components/Home.jsx'),
    Content = require('./components/Content.jsx'),
    About = require('./components/About.jsx');

var routes = (
  <Route name="app" handler={App} path="/">
    <Route name="home" handler={Home} path="/"/>
    <Route name="about" handler={About}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
