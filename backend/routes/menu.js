var express = require('express');
var router = express.Router();
var queries = require('../services/queries')

let entity = "menu"

router.get('/', function (req, res) {
    queries.select_all_query(entity, res)
});

router.post('/', function (req, res) {
    queries.add_one_query(entity, req, res)
});

router.get('/:id', function (req, res) {
     queries.select_one_query(entity, req.params.id, res)
})

router.post('/update', function (req, res) {  //changed to post 
    queries.update_one_query(entity, res.params.updated_data, res.params.id, req, res)
})

router.post('/delete', function (req, res) { //changed to post 
    queries.delete_one_query(entity, res.params.id, req, res)
})

module.exports = router;