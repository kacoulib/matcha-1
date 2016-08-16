var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var debug = require('debug')('matcha:http');
var logger = require('morgan');
var routes = require('../CLIENT/routes/index.js');

app.use(logger('dev'));
app.use(express.static(__dirname + '/../CLIENT/'));

// 404 not found
app.use(function (req, res, next) {
  res.status(404).send('<html><h1>404 page not found</h1></html>');
});

// 500 internal
app.use(function (err, req, res, next) {
  res.status(err.statusCode || err.status || 500);
  if (req.xhr || req.accepts(['html', 'json']) === 'json') {
    res.json({err: err.message});
  } else {
    res.status(500).send('<html><h1>500 internal</h1></html>');
  }
});


app.use('/', routes);

io.on('connection', function(socket) {
	debug('New connection');
	socket.on('disconnect', function() {
		debug('User disconnected');
  });
});

http.listen(3000, function () {
	debug('Listening on port 3000');
});
