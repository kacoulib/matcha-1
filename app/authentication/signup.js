var express = require('express');
var router = express.Router();
var passport = require('./passport');
var debug = require('debug')('matcha:signup');

var validateInputs = function (req, res , next) {
  req.checkBody('email', 'Email address should not be empty').notEmpty();
  req.checkBody('password', 'Password should be between 4 and 255 char').isLength(4, 255);

  req.checkBody('name', 'Name should not be empty').notEmpty();
  req.checkBody('username', 'Username should not be empty').notEmpty();
  req.checkBody('firstName', 'First name should not be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.render('signup', {
      userFields: {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        firstName: req.body.firstName
      },
      errors: errors
    });
  }

  req.checkBody('email', 'Mail address not well formated').isEmail();
  req.checkBody('username', 'Username should be only letters and numbers').isAlphanumeric();
  req.checkBody('name', 'Name should be only letters').isAlpha();
  req.checkBody('firstName', 'First name should be only letters').isAlpha();
  req.checkBody('password', 'Password should be only letters and numbers').isAlphanumeric();

  errors = req.validationErrors();
  if (errors) {
    return res.render('signup', {
      userFields: {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        firstName: req.body.firstName
      },
      errors: errors
    });
  }

  return next();
}

router.route('/signup')
  .get([], function (req, res) {
    res.render('signup', {
      meta: {
        title: 'MATCHA - SIGNUP'
      }
    });
  })
  .post([validateInputs, function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) {
        return res.render('signup', {
          userFields: {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            firstName: req.body.firstName
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
