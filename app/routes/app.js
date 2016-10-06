var express = require('express');
var router = express.Router();
var debug = require('debug')('matcha:routes');

router.get('/app', [], function (req, res) {
  debug(req.user);
  if (req.isAuthenticated()) {
    return res.render('app', {});
  }
  return res.redirect('/');
});

module.exports = router;
