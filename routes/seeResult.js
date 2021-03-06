var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var middleware = require(path.join(__dirname + "/../" + "middleware.js"));

router.get('/', function(req, res, next) {
	res.render('authResult', { error: null });
});


router.post('/', middleware.seeResult,function(req, res, next) {
	var conn = req.app.locals.connection;
 	var boyCR = "";
 	var girlCR = "";
 	var query = "SELECT * FROM Votes;";
 	conn.query(query ,function(err, rows, fields){
  		if(err){
    		console.log(err);
    		throw err;
    		return;
   		}
   		var maxBoy = { name: "", votes: 0 };
   		var maxGirl = { name: "", votes: 0 };
   		/*
   		maxBoy.votes = rows[0].votes;
   		maxBoy.name = rows[0].name;
   		maxGirl.votes = rows[0].votes;
   		maxGirl.name = rows[0].name;
   		*/
   		rows.forEach(function(row) {
   			if(row.gender=="M" && maxBoy.votes < row.votes) {
   				maxBoy.votes = row.votes;
   				maxBoy.name = row.name;
   			}
   			if(row.gender=="M" && maxBoy.votes == row.votes && (maxBoy.name != row.name)) {
				if(maxBoy.name === "") maxBoy.name = row.name;
   				else maxBoy.name = maxBoy.name + " and " + row.name;
   			}
   			if(row.gender=="F" && maxGirl.votes < row.votes) {
   				maxGirl.votes = row.votes;
   				maxGirl.name = row.name;
   			}
   			if(row.gender=="F" && maxGirl.votes == row.votes && (maxGirl.name != row.name)) {
				if(maxGirl.name === "") maxGirl.name = row.name;
   				else maxGirl.name = maxGirl.name + " and " + row.name;
   			}
			console.log("\nmaxBoy is "+maxBoy.name);
			console.log("\nmaxGirl is "+maxGirl.name);
			console.log("\nCurrent contestant is "+row.name);
   		});
  		boyCR = maxBoy.name;
  		girlCR = maxGirl.name;
  		res.render('seeResult', { CRB: boyCR, CRG: girlCR, VB: maxBoy.votes, VG: maxGirl.votes });
 	});
});

module.exports = router;
