var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/all', function(req, res, next) {
    var conn = req.app.locals.connection;
    var conts = [];
    conn.query("SELECT name, gender FROM vote.Votes", function(err, rows, fields){
        if(err){
            res.render('showAll', {errors : err.msg, conts : conts});
        } else {
            for(i = 0; i<rows.length; ++i){
                conts.push(rows[i]);
                console.log(rows[i]);
                console.log('\n');
            }
            res.render('showAll', {errors : '', conts : conts});
        }
    });
});

router.get('/:name', function(req, res, next){
    var name = req.params.name;
    var conn = req.app.locals.connection;
    conn.query("SELECT name, gender, agenda FROM vote.Votes WHERE name=?", name, function(err, rows, fields){
        if(err) {
            res.render('showCont', {errors : err.msg, name : '', gender : '', agenda : ''});
        } else {
            if(rows.length == 0) {
                res.render('showCont', {errors : '404!! Contestant does not exist', name : '', gender : '', agenda : ''});
            } else {
                res.render('showCont', {errors : '', name : rows[0].name, gender : rows[0].gender, agenda : rows[0].agenda});
            }
        }
    });
});

module.exports = router;
