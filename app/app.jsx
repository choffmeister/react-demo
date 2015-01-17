var React = require('react');

var ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    RouteHandler = ReactRouter.RouteHandler,
    DefaultRoute = ReactRouter.DefaultRoute,
    Link = ReactRouter.Link;

var ReactBootstrap = require('react-bootstrap'),
    Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem;

var ReactRouterBootstrap = require('react-router-bootstrap'),
    NavItemLink = ReactRouterBootstrap.NavItemLink,
    MenuItemLink = ReactRouterBootstrap.MenuItemLink;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar>
          <Nav>
            <NavItemLink to="home">Shop</NavItemLink>
            <NavItemLink to="about">About</NavItemLink>
          </Nav>
        </Navbar>
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var Content = React.createClass({
  render: function () {
    var segments = this.props.data.map(function (segment) {
      switch (segment.kind) {
        case 'header': return (<h1>{segment.text}</h1>);
        case 'paragraph': return (<p>{segment.text}</p>);
        case 'image': return (<img src={segment.url}/>);
      }
    });

    return (
      <div>
        {segments}
      </div>
    );
  }
});

var data = [
  { kind: 'header', text: 'Header #1' },
  { kind: 'paragraph', text: 'Lorem ipsum #1...' },
  { kind: 'paragraph', text: 'Lorem ipsum #2...' },
  { kind: 'image', url: 'http://lorempixel.com/g/465/168/' },
  { kind: 'header', text: 'Header #2' },
  { kind: 'paragraph', text: 'Lorem ipsum #3...' },
  { kind: 'header', text: 'Header #3' },
  { kind: 'paragraph', text: 'Lorem ipsum #4...' }
];

var Home = React.createClass({
  render: function () {
    return (
      <div>
        <Content data={data}/>
      </div>);
  }
});

var About = React.createClass({
  render: function () {
    return (<div>about</div>);
  }
});

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
