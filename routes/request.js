const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const logoutRequired = require('../middlewares/logoutRequired');
const authRequired = require('../middlewares/authRequired');

const validation = require('../validations/request');
const controller = require('../controllers/request');

const routes = express.Router();

routes.post('/reset-password', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), validation.resetPwd, errorHandler(controller.resetPwd));
routes.post('/change-email', errorHandler(authRequired, true), csrfHandler(csrfProtection), errorHandler(validation.changeEmail, true), errorHandler(controller.changeEmail));

module.exports = routes;