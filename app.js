var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var requestIp = require('request-ip');
/*var helmet = require('helmet');   // for http header security
var csrf = require('csurf');      // for CSRF attacks*/

var routes = require('./routes/index');
var users = require('./routes/users');
var vote = require('./routes/vote');
var submitVote = require('./routes/submitVote');
var doneVote = require('./routes/doneVote');
var seeResult = require('./routes/seeResult');
var showMyIp = require('./routes/showMyIp');
var register = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator({
  customValidators : {
    isWebmail: function(param, roll){
      if(param===roll+'@nitt.edu'){
        return true;
      }
      return false;
    },
    noWhitespace: function(param) {
      return !(/\s/g.test(param));
    }
  }
}));
app.use(requestIp.mw());
app.use(function(req, res, next) {
  var ip = req.clientIp;
  console.log(ip);
  next();
});
/*var csrfProtection = csrf({ cookie: true });
app.use(helmet());*/

app.use('/', routes);
app.use('/users', users);
app.use('/vote', vote);
app.use('/submitVote', submitVote);
app.use('/doneVote', doneVote);
app.use('/seeResult', seeResult);
app.use('/showMyIp', showMyIp);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
