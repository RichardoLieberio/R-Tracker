const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const logoutRequired = require('../middlewares/logoutRequired');

const validation = require('../validations/auth');
const controller = require('../controllers/auth');

const routes = express.Router();

routes.post('/login', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.login, true), errorHandler(controller.login));
routes.post('/forgot-password', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.forgotPwd, true), errorHandler(controller.forgotPwd));
routes.post('/logout', controller.logout);

module.exports = routes;