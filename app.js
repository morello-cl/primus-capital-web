var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const logger = require('morgan');
const axios = require('axios');
const cors = require('cors');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const moment = require('moment');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const awardRouter = require('./routes/award_route');
const cancellationsRouter = require('./routes/cancellations_route');
const walletStaftRouter = require('./routes/wallet-staft_route');
const surplusRouter = require('./routes/surplus_route');
const protestsRouter = require('./routes/protestst_route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.set("trust proxy", 1);
	const expiryDate = new Date(Date.now() + 60 * 60 * 250); // 15 min
	app.use(
		cookieSession({
			name: "primusCapitalSessionId",
			keys: ['dkihdjcsjsamdkdjdbgelcndh', 'djdjdbabbhshsgsgdlfljr'],
			cookie: {
				secure: true,
				httpOnly: true,
				domain: "*",
				// path: 'foo/bar',
				expires: expiryDate,
			},
		})
	);
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	console.log("serializeUser", user);

	done(null, user);
});

passport.deserializeUser((user, done) => {
	//console.log('deserializeUser', user);

	let expirationDate= moment(user.token_expires_in);
	console.log('expirationDate', expirationDate.format(), user.token_expires_in);


	if(moment().diff(expirationDate, 'second') > 0) {
		console.log('token vencido...');
		done(null, false);
	} else {
		done(null, user);
	}
});

passport.use(new LocalStrategy({
		usernameField     : 'rut',
		passwordField     : 'password',
		passReqToCallback : true
	}, async function(req, username, password, done){
		
		axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/login/authenticate', {
				username: username,
				password: password
		})
		.then(function(r) {

			let user = { 
				id: 1,
				rut: username,
				nombre: '',
				ejecutivo: '',
				fono: '',
				email: '',
				access_token: r.data.access_token,
				token_expires_in: r.data.token_expires_in,
				refresh_token: r.data.refresh_token,
				refresh_token_expires_in: r.data.refresh_token_expires_in
			};

			console.log('user', user);

			return done(null, user, { message: ''});
		})
		.catch(function(err) {
				console.log('err.code', err.code);
				console.log('err.message', err.message);
				console.log('err.stack', err.stack);

				return done(null, false, { message: 'Usuario o Password no Existen'});
		});
	})
);

app.use('/', indexRouter);
app.use('/award/api', awardRouter);
app.use('/cancellations/api', cancellationsRouter);
app.use('/wallet-staft/api', walletStaftRouter);
app.use('/surplus/api', surplusRouter);
app.use('/protests/api', protestsRouter);

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
