var express = require('express');
var router = express.Router();
const axios = require('axios');
const passport = require('passport');

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	return res.redirect("/login");
}

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index');
  //res.render('login');
});

router.get('/login', function(req, res, next){
  res.render('login');
});
router.post('/login', passport.authenticate("local", { failureRedirect: "/login" }), function(req, res, next) {
  console.log('user', req.user);
  res.redirect('/');
});

router.get("/logout", (req, res, next) => {
	req.logout();
	res.redirect("/");
});

router.get('/search-doc', function(req, res, next){
  res.render('buscar-documento');
});

router.get('/award', function(req, res, next){
  res.render('otorgamiento');
});

router.get('/cancellations', function(req, res, next){
  res.render('cancelaciones');
});

router.get('/wallet-staff', function(req, res, next){
  res.render('cartera-vigente');
});

router.get('/surplus', function(req, res, next){
  res.render('excedentes');
});

router.get('/protests', function(req, res, next){
  res.render('protestos');
});

module.exports = router;
