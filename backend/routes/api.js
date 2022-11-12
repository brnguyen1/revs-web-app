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
app.use('/orders', ordersRouter);
app.use('/inventory', inventoryRouter);
app.use('/menu', menuRouter);
app.use('/queue', queueRouter);
app.use('/server', serverRouter);


module.exports = router;
