var express = require('express');
var router = express.Router();

router.route('/signup')
  .get([], function (req, res) {
    res.render('signup', {
      meta: {
        title: 'MATCHA - SIGNUP'
      }
    });
  })
  .post([], function (req, res) {
    res.render('signup', {});
  });

module.exports = router;
