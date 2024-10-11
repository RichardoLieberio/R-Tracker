const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');
const logoutRequired = require('../middlewares/logoutRequired');

const validation = require('../validations/register');
const controller = require('../controllers/register');

const routes = express.Router();

routes.post('/', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.register, true), errorHandler(controller.register));
routes.post('/validate', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.validate, true), transactionHandler(controller.validate));

module.exports = routes;