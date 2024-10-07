const express = require('express');

const valid = require('../validations/user');
const contr = require('../controllers/user');

const routes = express.Router();

// Public routes
routes.post('/', valid.registerValidation, contr.register);

// Authenticated routes
routes.get('/', contr.getInfo);
routes.patch('/', contr.updateInfo);
routes.delete('/', contr.deleteAccount)

module.exports = routes;