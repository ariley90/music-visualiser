var React = require('react');

var Visualiser = require('./components/visualiser.react');

React.render(
  <Visualiser song={'test.mp3'} bars={64}/>,
  document.getElementById('container')
);