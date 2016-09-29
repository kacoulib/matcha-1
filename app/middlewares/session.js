var conf = require('../../config/index');
var session = require('express-session');

module.exports = session({
  secret: conf.sessions.secret,
  key: conf.sessions.key,
  resave: true,
  saveUninitialized: true,
  cookie: {
    domain: conf.fqdn,
    maxAge: conf.sessions.ttl
  }
});
