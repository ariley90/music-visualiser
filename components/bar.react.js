var React = require('react');

var Bar = React.createClass({


  render: function() {
    var value = (((this.props.size/255) * 100) - 100) * -1;
    var style = {
      background: "linear-gradient(to bottom, white " + value + "% , #16a085 " + (value + 1) + "% )"
    }

    return (
      <div style={style} className='bar'></div>
    );
  },

});

module.exports = Bar;