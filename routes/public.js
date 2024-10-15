const express = require('express');

const transactionHandler = require('../middlewares/transactionHandler');

const controller = require('../controllers/public');

const routes = express.Router();

routes.get('/verify-account/:token', transactionHandler(controller.verifyAccount));

module.exports = routes;