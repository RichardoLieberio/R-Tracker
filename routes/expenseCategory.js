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

routes.use(errorHandler(authRequired, true));
routes.use(errorHandler(adminRequired, true));

routes.get('/', errorHandler(controller.getCategories));
routes.post('/', csrfHandler(csrfProtection), validation.addCategory, transactionHandler(controller.addCategory));
routes.get('/:id', errorHandler(controller.getCategory));
routes.put('/:id', csrfHandler(csrfProtection), validation.editCategory, transactionHandler(controller.editCategory));
routes.delete('/:id', errorHandler(controller.deleteCategory));

module.exports = routes;