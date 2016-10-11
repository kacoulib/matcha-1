var express = require('express');
var router = express.Router();

var validateInput = function (req, res, next) {
  req.checkBody('email', 'Email should not be empty').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.render('forgot', {
      errors: errors
    });
  }

  return next();
}

router.route('/forgot')
  .get([], function (req, res) {
    res.render('forgot', {});
  })
  .post([validateInput], function (req, res) {
    res.render('forgot', {
      userFields: {
        email: req.body.email
      }
    });
  });

module.exports = router;
