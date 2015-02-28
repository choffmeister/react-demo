var React = require('react'),
    RestClient = require('../services/RestClient'),
    Content = require('./Content.jsx');

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
  statics: {
    fetchData: function () {
      return RestClient.get('http://addressbook-api.herokuapp.com/contacts');
    }
  },

  render: function () {
    return (
      <div>
        <Content data={data}/>
      </div>
    );
  }
});

module.exports = Home;
