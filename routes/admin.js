const express = require('express');

const expenseCategoryRoutes = require('./expenseCategory');

const routes = express.Router();

routes.use('/expense-category', expenseCategoryRoutes);

module.exports = routes;