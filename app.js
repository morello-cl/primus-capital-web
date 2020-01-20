var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const cors = require('cors');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'rut',
  passwordField: 'password'
}, function(username, password, done){
  console.log('uni', username, password);
  
  axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/login/authenticate', {
      username: username,
      password: password
  })
  .then(function(r) {
      console.log('r.data', r.data);

      return done(null, { 
          id: 1,
          rut: rut,
          nombre: '',
          ejecutivo: '',
          fono: '',
          email: '',
          jwt: r.data
      });
  })
  .catch(function(err) {
      console.log('err.code', err.code);
      console.log('err.message', err.message);
      console.log('err.stack', err.stack);

      return done(err, null);
  });
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
