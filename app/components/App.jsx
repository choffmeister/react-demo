var React = require('react');

var ReactRouter = require('react-router'),
    RouteHandler = ReactRouter.RouteHandler;

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
        <Navbar brand="react-demo">
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

module.exports = App;
