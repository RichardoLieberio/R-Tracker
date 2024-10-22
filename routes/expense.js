const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const csrfHandler = require('../middlewares/csrfHandler');
const errorHandler = require('../middlewares/errorHandler');
const authRequired = require('../middlewares/authRequired');

const validation = require('../validations/expense');
const controller = require('../controllers/expense');

const routes = express.Router();

routes.use(errorHandler(authRequired, true));

routes.get('/categories', errorHandler(controller.getCategories));
routes.get('/', errorHandler(controller.getExpenses));
routes.post('/', csrfHandler(csrfProtection), errorHandler(validation.addExpense, true), errorHandler(controller.addExpense));
routes.put('/:id', csrfHandler(csrfProtection), errorHandler(validation.editExpense, true), errorHandler(controller.editExpense));

module.exports = routes;