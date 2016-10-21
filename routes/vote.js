var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	var conn = req.app.locals.connection;
    var conts = [];
    conn.query("SELECT name, gender FROM vote.Votes", function(err, rows, fields){
        if(err){
            //res.render('showAll', {errors : err.msg, conts : conts});
        } else {
            for(i = 0; i<rows.length; ++i){
                conts.push(rows[i]);
                console.log(rows[i]);
                console.log('\n');
            }
            res.render('voteForm', { conts : conts});
        }
    });
});

module.exports = router;
