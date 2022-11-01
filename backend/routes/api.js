var express = require('express');
var queries = require('../services/queries')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  queries.query().then(data =>{
    res.json(data.rows);
  });
});

module.exports = router;
