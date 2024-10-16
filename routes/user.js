const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');
const logoutRequired = require('../middlewares/logoutRequired');
const authRequired = require('../middlewares/authRequired');

const validation = require('../validations/user');
const controller = require('../controllers/user');

const routes = express.Router();

routes.post('/register', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), errorHandler(validation.register, true), errorHandler(controller.register));
routes.post('/verify', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), errorHandler(validation.verify, true), transactionHandler(controller.verify));
routes.post('/reset-password', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), errorHandler(validation.resetPwd, true), transactionHandler(controller.resetPwd));

routes.post('/change-name', errorHandler(authRequired, true), csrfHandler(csrfProtection), errorHandler(validation.changeName, true), errorHandler(controller.changeName));
routes.post('/change-email', errorHandler(authRequired, true), csrfHandler(csrfProtection), errorHandler(validation.changeEmail, true), transactionHandler(controller.changeEmail));

module.exports = routes;