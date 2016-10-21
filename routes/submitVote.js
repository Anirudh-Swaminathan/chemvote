var express = require('express');
var router = express.Router();
var redis = require('redis');
var mysql = require('mysql');
var port = "6379", host = "127.0.0.1";
var client = redis.createClient(port, host);
client.on("connect", function() {
  console.log("Redis server running on port: " + port);
});

/* GET home page. */
router.post('/', function(req, res, next) {
	var response = {};

  	req.sanitize('votedCandidateBoy').escape();
  	req.sanitize('votedCandidateGirl').escape();

  	var votedCandidateBoy = req.body.votedCandidateBoy;
  	var votedCandidateGirl = req.body.votedCandidateGirl;
  	var ip = req.clientIp;
	var conn = req.app.locals.connection;
 	var query = "UPDATE Votes SET votes=votes+1 WHERE name LIKE '" + votedCandidateBoy + "%" + "' OR name LIKE'" + votedCandidateGirl + "%" +"';";

  	client.setnx(ip, 1, function(err, reply) {
	    if(!err) {
		    if(reply == 0) {
			    response.msg = 405;
			    res.set("Content-Type", "text/html");
			    var html = "<!DOCTYPE html><html><head><title>done vote</title></head><body><h2>You already voted!!..cant vote again</h2><a href='vote'>Home</a></body></html>";
			  	//res.end(JSON.stringify(response));
			  	//res.end(html);
			  	res.render('alreadyVoted');
			  	console.log("User already voted!!");
		    }
		    else {
		    	conn.query(query, function(err, rows, fields) {
 					if(err) {
 						console.log(err);
 						throw err;
 						return;
 					}
 					else {
 						console.log("Vote recorded in database!!");
 					}
 				});
			    response.msg = 200;
			  	//res.end(JSON.stringify(response));
			  	console.log("User vote recorded!!");
			  	res.redirect('/doneVote');
		    }
	    }
	    else {
	    	res.end("Revote!!");
	    }
    });
});

module.exports = router;
