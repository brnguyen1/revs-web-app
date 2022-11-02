var express = require('express');
var queries = require('../services/queries')
var router = express.Router();

/* GET orders */
router.get('/orders', function(req, res) {
  var entity = "orders"
  queries.select_all_query(entity).then(data =>{
    res.json(data);
  });
});

router.get('/queue', function(req, res) {
  var entity = "queue"
  queries.select_all_query(entity).then(data =>{
    res.json(data);
  });
});

router.get('/server', function(req, res) {
  var entity = "server"
  queries.select_all_query(entity).then(data =>{
    res.json(data);
  });
});

router.get('/menu', function(req, res) {
  var entity = "menu"
  queries.select_all_query(entity).then(data =>{
    res.json(data);
  });
});

router.get('/inventory', function(req, res) {
  var entity = "inventory"
  queries.select_all_query(entity).then(data =>{
    res.json(data);
  });
});

module.exports = router;
