var React = require('react');
var Bar = require('./bar.react');

var context = new AudioContext(),
    analyser = context.createAnalyser(),
    freqDomain,
    soundSource = context.createBufferSource();

soundSource.connect(analyser);
analyser.connect(context.destination);

var Visualiser = React.createClass({

  getInitialState: function() {
    analyser.fftSize = this.props.bars * 2;
    freqDomain = new Uint8Array(analyser.frequencyBinCount);
    return {
      data: freqDomain
    };
  },

  componentDidMount: function() {
    var req = new XMLHttpRequest(); 
    req.open("GET",".//" + this.props.song,true); 
    req.responseType = "arraybuffer"; 
    req.send(); 
    var self = this; 
    req.onload = function() { 
        context.decodeAudioData(req.response, function(buffer) { 
            soundSource.buffer = buffer;
            soundSource.start();
            self.getState();
        }); 
    }; 
  },

  componentWillUnmount: function() {
  },

  render: function() {
    var bars = [];
    for (var i = 0; i <this.state.data.length; i++){
      bars.push(<Bar size={this.state.data[i]} />);
    };
    return (
      <div className='test'>{bars}</div>
    );
  },

  getState: function() {
    requestAnimationFrame(this.getState);
    analyser.getByteFrequencyData(freqDomain);
    this.setState({
      data: freqDomain
    });
  }

});

module.exports = Visualiser;