var express = require('express');
var queries = require('../services/queries')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  queries.query();
});

module.exports = router;
