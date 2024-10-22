const express = require('express');

const errorHandler = require('../middlewares/errorHandler');
const authRequired = require('../middlewares/authRequired');
const adminRequired = require('../middlewares/adminRequired');

const expenseCategoryRoutes = require('./expenseCategory');
const adminUserRoutes = require('./adminUser');

const routes = express.Router();

routes.use(errorHandler(authRequired, true));
routes.use(errorHandler(adminRequired, true));

routes.use('/expense-category', expenseCategoryRoutes);
routes.use('/user', adminUserRoutes);

module.exports = routes;