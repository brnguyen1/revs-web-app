var express = require('express');
var router = express.Router();
var queries = require('../services/queries')

router.get('/', function (req, res) {
    var entity = "queue"
    queries.select_all_query(entity).then(data => {
        res.json(data);
    });
});

module.exports = router;