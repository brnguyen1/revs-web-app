var express = require('express');
var router = express.Router();
var queries = require('../services/queries')

let entity = "inventory"

router.get('/', function (req, res) {
    queries.select_all_query(entity, res)
});

router.post('/', function (req, res) {
    queries.add_one_query(entity, req, res)
});

router.get('/:id', function (req, res) {
     queries.select_one_query(entity, req.params.id, res)
})

router.put('/:id', function (req, res) {  //changed to put 
    queries.update_one_query(entity, req, res)
})

router.delete('/:id', function (req, res) { //changed to delete
    queries.delete_one_query(entity, req, res)
})


module.exports = router;