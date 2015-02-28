var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute,
    RestClient = require('./services/RestClient');

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

var fetchData = function (routes, params) {
  var data = {};
  var fetch = routes
    .filter(r => r.handler.fetchData)
    .map(r => r.handler.fetchData(params).then(d => data[r.name] = d));

  return Promise.all(fetch).then(() => data);
};

ReactRouter.run(routes, function (Handler, state) {
  console.log('loadStart', state);

  fetchData(state.routes, state.params)
    .then((data) => {
      console.log('loadEnd', data);
      React.render(<Handler data={data}/>, document.body);
    });
});
