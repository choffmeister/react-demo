var React = require('react');

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

module.exports = Content;
