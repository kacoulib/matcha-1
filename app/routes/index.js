var express = require('express');
var router = express.Router();

router.get('/', [], function (req, res) {
  return res.render('index', {});
});

router.get('/signup', [], function (req, res) {
  return res.render('signup', {});
});

module.exports = router;
