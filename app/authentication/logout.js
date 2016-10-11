var express = require('express');
var router = express.Router();
var debug = require('debug')('matcha:logout');

router.get('/logout', function (req, res) {
  if (req.user && req.username)
    debug('Logout user : ' + req.user.username);
  req.logout();
  res.redirect('/');
});

module.exports = router;
