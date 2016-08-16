var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var path = require("path");
	res.sendFile(path.join(__dirname, '..', 'CLIENT' ,'index.html'));
});

module.exports = router;
