var express = require('express');
var router = express.Router();
var passport = require('../authentication/passport');
var debug = require('debug')('matcha:index');

var validateInputs = function (req, res, next) {
  req.checkBody('username', 'Username or email should not be empty').notEmpty();
  req.checkBody('password', 'Password should not be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.render('index', {
      userFields: {
        username: req.body.username
      },
      errors: errors
    });
  }

  return next();
};

router.route('/')
  .get([], function (req, res) {
    res.render('index', {});
  })
  .post([validateInputs, function (req, res, next) {
    passport.authenticate('local-signin', function (err, user, info) {
      if (err) {
        return res.render('index', {
          userFields: {
            username: req.body.username
          },
          errors: [{msg: err}]
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        if (user && user.username)
          debug('Authenticate user : ' + user.username);
        return res.redirect('/app');
      });
    })(req, res, next);
  }], function (req, res) {
    res.redirect('/app');
  });

module.exports = router;
