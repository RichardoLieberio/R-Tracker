const express = require('express');

const validation = require('../validations/register');
const controller = require('../controllers/register');

const routes = express.Router();

routes.post('/', validation.register, controller.register); // Register User
routes.post('/validate') // Validate User

module.exports = routes;