var router = express.Router();
var queries = require('../services/queries')

router.get('/', function (req, res) {
    var entity = "inventory"
    queries.select_all_query(entity).then(data => {
        res.json(data);
    });
});

module.exports = router;