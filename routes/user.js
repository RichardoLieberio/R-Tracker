const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');
const logoutRequired = require('../middlewares/logoutRequired');

const validation = require('../validations/user');
const controller = require('../controllers/user');

const routes = express.Router();

routes.post('/register', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.register, true), errorHandler(controller.register));
routes.post('/validate', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.validate, true), transactionHandler(controller.validate));
routes.post('/forgot-password', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.forgotPwd, true), errorHandler(controller.forgotPwd));

module.exports = routes;