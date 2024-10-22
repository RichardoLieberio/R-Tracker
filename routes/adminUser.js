const express = require('express');

// const validation = require('../validations/expense');
const controller = require('../controllers/adminUser');

const routes = express.Router();

routes.get('/', controller.getUsers);

module.exports = routes;