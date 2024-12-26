const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');

const validation = require('../validations/adminUser');
const controller = require('../controllers/adminUser');

const routes = express.Router();

routes.get('/', errorHandler(controller.getAllUsers));
routes.patch('/:id', csrfHandler(csrfProtection), errorHandler(validation.updateUser, true), transactionHandler(controller.updateUser));
routes.delete('/:id', csrfHandler(csrfProtection), transactionHandler(controller.deleteAccount))
routes.patch('/:id/change-password', csrfHandler(csrfProtection), errorHandler(validation.changePwd, true), transactionHandler(controller.changePwd));
routes.patch('/:id/whitelist', csrfHandler(csrfProtection), errorHandler(controller.whitelist));
routes.patch('/:id/blacklist', csrfHandler(csrfProtection), errorHandler(validation.blacklist, true), transactionHandler(controller.blacklist));
routes.patch('/:id/block-token', csrfHandler(csrfProtection), errorHandler(controller.blockToken));
routes.get('/:id/expenses', errorHandler(controller.getUserExpenses));

module.exports = routes;