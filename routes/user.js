const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');
const logoutRequired = require('../middlewares/logoutRequired');
const accessTokenRequired = require('../middlewares/accessTokenRequired');

const validation = require('../validations/user');
const controller = require('../controllers/user');

const routes = express.Router();

routes.post('/register', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.register, true), errorHandler(controller.register));
routes.post('/verify', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.verify, true), transactionHandler(controller.verify));
routes.post('/forgot-password', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.forgotPwd, true), errorHandler(controller.forgotPwd));
routes.post('/reset-password', logoutRequired, csrfHandler(csrfProtection), errorHandler(validation.resetPwd, true), transactionHandler(controller.resetPwd));

routes.use(accessTokenRequired);
routes.use(csrfHandler(csrfProtection));

routes.post('/change-name', errorHandler(validation.changeName, true), errorHandler(controller.changeName));
routes.post('/change-email', errorHandler(validation.changeEmail, true), errorHandler(controller.changeEmail));

module.exports = routes;