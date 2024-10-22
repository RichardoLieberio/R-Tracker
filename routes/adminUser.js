const express = require('express');

const errorHandler = require('../middlewares/errorHandler');
const authRequired = require('../middlewares/authRequired');
const adminRequired = require('../middlewares/adminRequired');

// const validation = require('../validations/expense');
const controller = require('../controllers/adminUser');

const routes = express.Router();

routes.use(errorHandler(authRequired, true));
routes.use(errorHandler(adminRequired, true));

routes.get('/', errorHandler(controller.getUsers));

module.exports = routes;