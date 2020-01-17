var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next){
  res.render('login');
});
router.post('/login', function(req, res, next){
  axios.post( 'http//200.54.149.45/PrimusCapital.WebClienteApi/api/login/authenticate', {
    username: 'pruebas',
    password: 'Primus123'
  }, { 
        timeout: 60000,
        withCredentials: false
    })
    .then(r => {
        console.log(r.data);
    })
    .catch(err => {
        console.log(err.code);
        console.log(err.message);
        console.log(err.stack);
    });

  res.json();
});

module.exports = router;
