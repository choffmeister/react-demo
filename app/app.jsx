var React = require('react'),
    Route = require('react-router'),
    Application = require('./components/Application.jsx');

/*var routes = (
  <Route handler={Application} path="/">
    <DefaultRoute handler={Home} />
    <Route name="about" handler={About} />
    <Route name="users" handler={Users}>
      <Route name="recent-users" path="recent" handler={RecentUsers} />
      <Route name="user" path="/user/:userId" handler={User} />
      <NotFoundRoute handler={UserRouteNotFound}/>
    </Route>
    <NotFoundRoute handler={NotFound}/>
    <Redirect from="company" to="about" />
  </Route>
);*/

React.render(<Application title="shop" />, document.body);
