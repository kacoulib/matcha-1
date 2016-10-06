'use strict'
var debug = require('debug')('matcha:passport');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../schemas/user');

// serialize user for the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// deserialize user
passport.deserializeUser(function (id, done) {
  done(null, user);
});

var localStrategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
};

// email and password signup
passport.use('local-signup', new LocalStrategy(localStrategyOptions,
  function (req, username, password, done) {
    process.nextTick(function () {
      if (req.user) {
        debug(req.user);
        // user already connected
      }

      var email = req.body.email;
      email = email.toLowerCase();
      username = username.toLowerCase();
      var regexMail = '^' + email + '$';
      var regexUsername = '^' + username + '$';
      User.findOne({$or : [{ 'mail': {$regex: regexMail, $options: 'i'}}, {'username': {$regex: regexUsername, $options: 'i'} }]}, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          if (user.mail == email) {
            return done('Email allready used');
          }
          if (user.username == username) {
            return done('Username allready used');
          }
        }

        var usr = User.getNewUser();
        usr.mail = email;
        usr.name = req.body.name;
        usr.username = username;
        usr.firstname = req.body.firstName;
        usr.password = password;
        usr.save(function (err) {
          if (err) {
            return done(err);
          }
          done(null, usr);
        });
      });
    });
  })
);

module.exports = passport;
