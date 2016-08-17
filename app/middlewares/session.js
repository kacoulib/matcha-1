var session = require('express-session');

module.exports = session({
  secret: 'q4qsd65df45s4d5f45ds5fsf4s',
  key: 'matcha.sid',
  resave: true,
  saveUninitialized: true,
  cookie: {}
});
