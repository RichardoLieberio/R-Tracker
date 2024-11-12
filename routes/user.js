const express = require('express');

const limiter = require('../services/limiter');
const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');
const logoutRequired = require('../middlewares/logoutRequired');
const authRequired = require('../middlewares/authRequired');

const validation = require('../validations/user');
const controller = require('../controllers/user');

const routes = express.Router();

routes.post('/register', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), errorHandler(validation.register, true), limiter(3), errorHandler(controller.register));
routes.post('/verify', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), validation.verify, limiter(15), transactionHandler(controller.verify));
routes.patch('/reset-password', errorHandler(logoutRequired, true), csrfHandler(csrfProtection), validation.resetPwd, limiter(15), transactionHandler(controller.resetPwd));

routes.get('/info', errorHandler(authRequired, true), errorHandler(controller.getInfo));
routes.patch('/change-name', errorHandler(authRequired, true), csrfHandler(csrfProtection), validation.changeName, limiter(5), errorHandler(controller.changeName));
routes.patch('/change-email', errorHandler(authRequired, true), csrfHandler(csrfProtection), errorHandler(validation.changeEmail, true), limiter(3), transactionHandler(controller.changeEmail));
routes.patch('/change-password', errorHandler(authRequired, true), csrfHandler(csrfProtection), validation.changePwd, limiter(3), errorHandler(controller.changePwd));
routes.delete('/:id', errorHandler(authRequired, true), csrfHandler(csrfProtection), transactionHandler(controller.deleteAccount));

module.exports = routes;