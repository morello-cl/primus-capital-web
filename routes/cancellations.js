const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

function isLoggedIn(req, res, next) {
  console.log('isLoggedIn', req.user);

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	return res.redirect("/login");
}

router.get('/sp_11_res/:dt_ini/:dt_end', isLoggedIn, function(req, res, next){
    
    console.log('aca 2');

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_11_res', {
        rut: 0,
        fdesde: req.params.dt_ini,
        fhasta: req.params.dt_end,
        codempl : 0,
        codcli: 0
    }, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log(r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('err', err);
            res.json({});
        });
    
});

module.exports = router;