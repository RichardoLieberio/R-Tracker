const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const limiter = require('../middlewares/limiter');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const logoutRequired = require('../middlewares/logoutRequired');

const validation = require('../validations/auth');
const controller = require('../controllers/auth');

const routes = express.Router();

routes.post('/login', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), validation.login, limiter(10), errorHandler(controller.login));
routes.post('/logout', csrfHandler(csrfProtection), errorHandler(controller.logout));

module.exports = routes;