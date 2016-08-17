var express = require('express');
var router = express.Router();

router.route('/login')
  .get([], function (req, res) {
    res.render('login', {
      meta: {
        title: 'MATCHA - LOGIN'
      }
    });
  })
  .post([], function (req, res) {
    res.render('login', {});
  });

module.exports = router;
