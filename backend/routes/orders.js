var express = require('express');
var router = express.Router();
var queries = require('../services/queries')

let entity = "orders"

router.get('/', function (req, res) {
    queries.select_all_query(entity, res)
});

router.post('/', function (req, res) {
    queries.inventory_update(req)
    queries.add_one_query(entity, req, res)
});

router.get('/id', function (req, res) {
     queries.max_query(entity, req, res)
})

router.put('/:id', function (req, res) {  //changed to put 
    queries.update_one_query(entity, req, res)
})

router.delete('/:id', function (req, res) { //changed to delete
    queries.delete_one_query(entity, req, res)
})

module.exports = router;