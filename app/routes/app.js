var express = require('express');
var router = express.Router();
var debug = require('debug')('matcha:routes');

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

router.get('/app', [isLoggedIn], function (req, res) {
  return res.render('app', { user: req.user });
});

module.exports = router;
