const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');
const authRequired = require('../middlewares/authRequired');
const adminRequired = require('../middlewares/adminRequired');

const validation = require('../validations/expenseCategory');
const controller = require('../controllers/expenseCategory');

const routes = express.Router();

routes.get('/', errorHandler(authRequired, true), errorHandler(controller.getCategories))
routes.post('/', errorHandler(authRequired, true), errorHandler(adminRequired, true), csrfHandler(csrfProtection), validation.addCategory, transactionHandler(controller.addCategory));
routes.get('/:id', errorHandler(authRequired, true), errorHandler(adminRequired, true), errorHandler(controller.getCategory));
routes.put('/:id', errorHandler(authRequired, true), errorHandler(adminRequired, true), csrfHandler(csrfProtection), validation.editCategory, transactionHandler(controller.editCategory));

module.exports = routes;