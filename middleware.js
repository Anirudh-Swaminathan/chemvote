var config = require('./config/registerConfig');

module.exports = {
	seeResult: function(req, res, next) {
		var response = {};

	  	req.sanitize('pass').escape();

	  	var pass = req.body.pass;
	  	var passMatch = config.resultPass;
	  	if(pass == passMatch) {
	  		next();
	  	}
	  	else {
	  		var error = "Either type the right password or dont try and see the result beforehand!!";
	  		res.render('authResult', { error: error });
	  	}
	}
}