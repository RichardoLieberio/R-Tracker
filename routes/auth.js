const express = require('express');

const validation = require('../validations/auth');
const controller = require('../controllers/auth');

const routes = express.Router();

routes.post('/login', controller.login);
routes.post('/logout', controller.logout);

module.exports = routes;