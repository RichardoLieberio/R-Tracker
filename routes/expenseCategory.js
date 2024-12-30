const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const transactionHandler = require('../middlewares/transactionHandler');

const validation = require('../validations/expenseCategory');
const controller = require('../controllers/expenseCategory');

const routes = express.Router();

routes.get('/', errorHandler(controller.getCategories));
routes.post('/', csrfHandler(csrfProtection), validation.addCategory, transactionHandler(controller.addCategory));
routes.get('/:id', errorHandler(controller.getCategory));
routes.put('/:id', csrfHandler(csrfProtection), validation.editCategory, transactionHandler(controller.editCategory));
routes.delete('/:id', csrfHandler(csrfProtection), errorHandler(controller.deleteCategory));
routes.patch('/:id/hide', csrfHandler(csrfProtection), errorHandler(controller.hideCategory));
routes.patch('/:id/unhide', csrfHandler(csrfProtection), errorHandler(controller.unhideCategory));

module.exports = routes;