var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var ip = req.clientIp;
  	res.render('showMyIp', { ip: ip });
});

module.exports = router;
