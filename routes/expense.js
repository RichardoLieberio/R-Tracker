const express = require('express');

const validation = require('../validations/expense');
const controller = require('../controllers/expense');

const expenseCategoryRoutes = require('./expenseCategory');

const routes = express.Router();

routes.use('/category', expenseCategoryRoutes);

module.exports = routes;