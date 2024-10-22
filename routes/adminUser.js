const express = require('express');

const errorHandler = require('../middlewares/errorHandler');

// const validation = require('../validations/expense');
const controller = require('../controllers/adminUser');

const routes = express.Router();

routes.get('/', errorHandler(controller.getAllUsers));

module.exports = routes;