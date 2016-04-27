var express = require('express');
require('pmx').init({
  http : true
});
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cache = require( "node-cache" );
var session = require('express-session');

global.config = require('./package.json').config;
global.cache = new cache();
global.orm = require('orm');
global.dirname = __dirname;

var routes = require('./routes/index');
var enroll = require('./routes/enroll');
var management = require('./routes/management');
var sign_up = require('./routes/sign_up');
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(orm.express(config.mysql_address, {
  define: function (db, models, next) {
    models.enroll = db.define("enroll", {
      id : { type: 'serial', key: true },
      uid:  { type: 'number', required: true },
      battle_name:  String,
      player1:  String,
      mobile:  String,
      player2:  String,
      player3:  String,
      player4:  String,
      player5:  String,
      player6:  String,
      enable:  Boolean,
      round: Number,
      add_time: Date
    });
    models.user = db.define("user",{
      id : { type: 'serial', key: true },
      mobile:  String,
      pwd: String,
      enabled:  Boolean
    });
    models.match = db.define("match",{
      id : { type: 'serial', key: true },
      status:  String,
      vs_url: String,
      vs_id:  String,
      name:  String,
      round1:  String,
      round2:  String
    });
    next();
  }
}));
app.use(session({
  secret:'manila',
  key:'manila',
  cookie:{maxAge:1000*60*60*24},
  resave: false,
  saveUninitialized: false
}));
app.use('/', routes);
app.use('/enroll', enroll);
app.use('/management', management);
app.use('/sign_up',sign_up);
app.use('/users', users);

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
