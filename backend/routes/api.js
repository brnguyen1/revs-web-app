var express = require('express');
const app = require('../app');
var queries = require('../services/queries')
var router = express.Router();

//endpoints
const inventoryRouter = require('./inventory.js')
const ordersRouter = require('./orders.js')
const menuRouter = require('./menu.js')
const queueRouter = require('./queue.js')
const serverRouter = require('./server.js')

/* GET orders */
router.use('/orders', ordersRouter);
router.use('/inventory', inventoryRouter);
router.use('/menu', menuRouter);
router.use('/queue', queueRouter);
router.use('/server', serverRouter);


module.exports = router;
