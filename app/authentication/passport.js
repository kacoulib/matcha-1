'use strict'
var debug = require('debug')('matcha:passport');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// serialize user for the session
passport.serializeUser(function (user, done) {
  debug('hello bitch');
  debug(user);
  done(null, user);
});

// deserialize user
passport.deserializeUser(function (id, done) {
  done(null, user);
});

var localStrategyOptions = {
  usernameField: 'email', // by default LocalStrategy use username
  passwordField: 'password',
  passReqToCallback: true
};

// email and password signup
passport.use('local-signup', new LocalStrategy(localStrategyOptions,
  function (req, email, password, done) {
    process.nextTick(function () {
      debug('coucou');
      done(null, 'test');
    });
  })
);

module.exports = passport;
