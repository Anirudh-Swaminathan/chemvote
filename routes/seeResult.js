var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
	var conn = req.app.locals.connection;
	/*conn.query("SELECT * FROM Votes as SOLUTION",function(err, rows, fields){
  		if(err){
    		console.log(err);
    		throw err;
    		return;
   		}
  		console.log("Connection to database and table successful!!");
 	});*/
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
   				maxBoy.name = maxBoy.name + " and " + row.name;
   			}
   			if(row.gender=="F" && maxGirl.votes < row.votes) {
   				maxGirl.votes = row.votes;
   				maxGirl.name = row.name;
   			}
   			if(row.gender=="F" && maxGirl.votes == row.votes && (maxGirl.name != row.name)) {
   				maxGirl.name = maxGirl.name + " &(and)& " + row.name;
   			}
   		});
  		boyCR = maxBoy.name;
  		girlCR = maxGirl.name;
  		res.render('seeResult', { CRB: boyCR, CRG: girlCR, VB: maxBoy.votes, VG: maxGirl.votes });
 	});
});

module.exports = router;
