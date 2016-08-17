var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var debug = require('debug')('matcha:http');
var logger = require('morgan');
var underscoreTemplate = require('./util/underscore-template');
var bodyParser = require('body-parser');
var session = require('./app/middlewares/session');

app.use(logger('dev'));
app.use(express.static(__dirname + '/../public/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session);

// template engine
app.engine('html', underscoreTemplate.express({}));
app.set('view engine', 'html');

// routes
app.use(require('./app/routes/index'));

// routes authenticates
app.use(require('./app/authentication/login'));

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
    debug('web-server error', err);
    res.status(500).send('<html><h1>500 internal</h1></html>');
  }
});

io.on('connection', function(socket) {
	debug('New connection');
	socket.on('disconnect', function() {
		debug('User disconnected');
  });
});

http.listen(3000, function () {
	debug('Listening on port 3000');
});
