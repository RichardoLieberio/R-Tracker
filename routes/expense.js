const express = require('express');

const errorHandler = require('../middlewares/errorHandler');
const authRequired = require('../middlewares/authRequired');

const validation = require('../validations/expense');
const controller = require('../controllers/expense');

const routes = express.Router();

routes.use(errorHandler(authRequired, true));

routes.get('/categories', errorHandler(controller.getCategories));
routes.get('/', errorHandler(controller.getExpenses));

module.exports = routes;