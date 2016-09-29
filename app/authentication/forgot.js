var express = require('express');
var router = express.Router();

router.route('/forgot')
  .get([], function (req, res) {
    res.render('forgot', {
      meta: {
        title: 'MATCHA - FORGOT'
      }
    });
  })
  .post([], function (req, res) {
    res.render('forgot', {});
  });

module.exports = router;
