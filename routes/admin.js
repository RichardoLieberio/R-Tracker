const express = require('express');

const expenseCategoryRoutes = require('./expenseCategory');
const adminUserRoutes = require('./adminUser');

const routes = express.Router();

routes.use('/expense-category', expenseCategoryRoutes);
routes.use('/user', adminUserRoutes);

module.exports = routes;