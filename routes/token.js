const express = require('express');

const csrfProtection = require('../services/csrfProtection');
const controller = require('../controllers/token');

const routes = express.Router();

routes.get('/csrf', csrfProtection, controller.getCSRFToken);

module.exports = routes;