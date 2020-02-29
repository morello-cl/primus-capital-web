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

router.get('/sp_15_res', isLoggedIn, function(req, res, next){
    let _rut = req.query.rut ? req.query.rut : 0;

    const _body = {
        rut: _rut,
        fdesde: req.query.date.gte,
        fhasta: req.query.date.lte,
        codempl : 0,
        codcli: 0,
        tipoinfo: 1
    };

    console.log('sp_15_res', _body);

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_15_res', _body, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log('sp_15_res', r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('sp_15_res.err', err);

            res.status(400).json({
            });
        });
    
});

router.get('/sp_15_det', isLoggedIn, function(req, res, next){
    let _rut = req.query.rut ? req.query.rut : 0;

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_15_det', {
        rut: _rut,
        fdesde: req.query.date.gte,
        fhasta: req.query.date.lte,
        codempl : 0,
        codcli: 0
    }, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log('sp_15_det', r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('sp_15_det.err', err);

            res.status(400).json({
            });
        });
    
});

router.get('/sp_15_doc', isLoggedIn, function(req, res, next){
    let _rut = req.query.rut ? req.query.rut : 0;

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_15_doc', {
        rut: _rut,
        fdesde: req.query.date.gte,
        fhasta: req.query.date.lte,
        codempl : 0,
        codcli: 0
    }, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log('sp_15_doc', r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('sp_15_doc.err', err);

            res.status(400).json({
            });
        });
    
});

module.exports = router;