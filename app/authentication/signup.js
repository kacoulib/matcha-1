var express = require('express');
var router = express.Router();
var passport = require('./passport');
var debug = require('debug')('matcha:signup');

router.route('/signup')
  .get([], function (req, res) {
    debug('get');
    res.render('signup', {
      meta: {
        title: 'MATCHA - SIGNUP'
      }
    });
  })
  .post([function (req, res, next) {
    debug('post');
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) {
        return res.render('signup', {
          userFields: {
            email: req.body.email,
            username: req.body.username
          },
          errors: [{msg: err}]
        });
      }
      debug(err, user, info);
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.render('index', {meta: {title: 'MATCHA'}});
      });
    })(req, res, next);
  }], function (req, res) {
    res.render('signup', {
      meta: {
        title: 'MATCHA - SIGNUP'
      }
    });
  });

module.exports = router;
