const express = require('express');

const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');

const validation = require('../validations/register');
const controller = require('../controllers/register');

const routes = express.Router();

routes.post('/', errorHandler(validation.register, true), errorHandler(controller.register));
routes.post('/validate', errorHandler(validation.validate, true), transactionHandler(controller.validate));

module.exports = routes;