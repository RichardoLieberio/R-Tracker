const express = require('express');

const validation = require('../validations/expenseCategory');
const controller = require('../controllers/expenseCategory');

const routes = express.Router();

module.exports = routes;