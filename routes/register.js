var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var registerConfig = require(path.join(__dirname, '/../' ,'config/registerConfig.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {errors : ''});
});

// POST request
router.post('/', function(req, res, next) {
    var conn = req.app.locals.connection;

    req.sanitize('name').escape();
    req.sanitize('pass').escape();
    req.sanitize('gender').escape();

    var name = req.body.name;
    var gender = req.body.gender;
    var agenda = req.body.agenda;
    var pwd = req.body.pass;
    var adminPwd = registerConfig.adminPwd;

    // Check name
    req.assert('name','The Name must not be empty and mustn\'t contain special characters').matches(/[a-zA-Z][a-zA-Z ]+|[a-zA-Z]/);

    // Check Password
    req.assert('pass','Password must not be empty, and mustn\'t contain any whitespace').notEmpty().noWhitespace();
    req.assert('pass','Password doesnt match!!').equals(adminPwd);

    // Check gender
    if(!(gender === 'M' || gender ==='F')){
        res.render('register', {errors : 'Gender not chosen'});
        return;
    }

    // Check agenda
    req.assert('agenda', 'Agenda must not be empty').notEmpty();

    var errors = req.validationErrors();
    if(!errors){
        conn.query("INSERT into vote.Votes(name, votes, gender, agenda) VALUES(?,?,?,?)", [name, 0, gender, agenda], function(err, result){
            if(err) {
                console.log("SQL Error!!\n");
                console.log(err.code);
                console.log('\n');
                if(err.code === 'ER_DUP_ENTRY'){
                    res.render('register', {errors : 'Already Registered'});
                }
                else res.render('register', {errors : 'SQL Error!!'});
            } else {
                res.render('doneRegister');
            }
        });
    } else {
        console.log('\n\n');
        console.log(errors);
        console.log('\n');
        res.render('register', {errors : errors[0].msg});
    }
});

module.exports = router;
