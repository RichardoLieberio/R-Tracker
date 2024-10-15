const express = require('express');

const controller = require('../controllers/public');

const routes = express.Router();

routes.get('/verify-account/:token', controller.verifyAccount);

module.exports = routes;