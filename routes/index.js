var express = require('express');
var router = express.Router();
const axios = require('axios');
const passport = require('passport');

function isLoggedIn(req, res, next) {
  console.log('isLoggedIn', req.user);

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	return res.redirect("/login");
}

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/login', function(req, res, next){
  res.render('login');
});
router.post('/login', passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login" }));

router.get("/logout", (req, res, next) => {
	req.logout();
	res.redirect("/");
});

router.get('/search-doc', isLoggedIn, function(req, res, next){
  res.render('buscar-documento', { user: req.user });
});

router.get('/award', isLoggedIn, function(req, res, next){
  res.render('award_page', { user: req.user });
});

router.get('/cancellations', isLoggedIn, function(req, res, next){
  res.render('cancelaciones', { user: req.user });
});

router.get('/wallet-staff', isLoggedIn, function(req, res, next){
  res.render('cartera-vigente', { user: req.user });
});

router.get('/surplus', isLoggedIn, function(req, res, next){
  res.render('excedentes', { user: req.user });
});

router.get('/protests', isLoggedIn, function(req, res, next){
  res.render('protestos', { user: req.user });
});

module.exports = router;
