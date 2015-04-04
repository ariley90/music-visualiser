var express = require('express');
var app = express();

app.use(express.static('.//public'));

var server = app.listen(3000, function () {
  var host = server.address().address,
  port = server.address().port;

  console.log('listening at http://%s:%s', host, port)
});