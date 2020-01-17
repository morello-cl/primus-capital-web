var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index');
  res.render('login');
});

router.get('/login', function(req, res, next){
  res.render('login');
});
router.post('/login', function(req, res, next){
  console.log('aca....');

  setTimeout(() => {

  axios.post( 'https://200.54.149.45/PrimusCapital.WebClienteApi/api/login/authenticate', {
    username: 'pruebas',
    password: 'Primus123'
  })
    .then(r => {
        console.log('r', r);

        res.status(400).json({});
    })
    .catch(err => {
        console.log('err.code', err.code);
        console.log('err.message', err.message);
        console.log('err.stack', err.stack);

        res.status(400).json({});
    });
  }, 15000);
});

router.get('/search-doc', function(req, res, next){
  res.render('buscar-documento');
});

module.exports = router;
