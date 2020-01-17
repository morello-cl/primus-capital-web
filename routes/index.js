var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  //res.render('login');
});

router.get('/login', function(req, res, next){
  res.render('login');
});
router.post('/login', function(req, res, next){
  console.log('aca....');

  axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/login/authenticate', {
    username: 'pruebas',
    password: 'Primus123'
  })
  .then(r => {
      console.log('r.data', r.data);

      res.json({});
  })
  .catch(err => {
      console.log('err.code', err.code);
      console.log('err.message', err.message);
      console.log('err.stack', err.stack);

      res.status(400).json({});
  });
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
