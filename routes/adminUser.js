const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');

const validation = require('../validations/adminUser');
const controller = require('../controllers/adminUser');

const routes = express.Router();

routes.get('/', errorHandler(controller.getAllUsers));
routes.post('/:id/block-token', errorHandler(controller.blockToken));
routes.patch('/:id/whitelist', errorHandler(controller.whitelist));
routes.patch('/:id/blacklist', csrfHandler(csrfProtection), errorHandler(validation.blacklist, true), transactionHandler(controller.blacklist));
routes.patch('/:id/change-password', csrfHandler(csrfProtection), errorHandler(validation.changePwd, true), transactionHandler(controller.changePwd));

module.exports = routes;