var express = require('express');
var router = express.Router();
var queries = require('../services/queries')

let entity = "menu"

router.get('/', function (req, res) {
    queries.select_all_query(entity, res)
});

router.get('/:id', function (req, res) {
     queries.select_one_query(entity, req.params.id, res)
})

router.get('/', function (req, res) {
    queries.update_one_query(entity, res.params.updated_data, res.params.id, req, res)
})

router.get('/:id', function (req, res) {
    queries.delete_one_query(entity, res.params.id, req, res)
})

module.exports = router;