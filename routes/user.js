const express = require('express');

const errorHandler = require('../middlewares/errorHandler');

const valid = require('../validations/user');
const contr = require('../controllers/user');

const routes = express.Router();

// Public routes
routes.post('/', errorHandler(valid.registerValidation, true), errorHandler(contr.register));

// Authenticated routes
routes.get('/', contr.getInfo);
routes.patch('/', contr.updateInfo);
routes.delete('/', contr.deleteAccount)

module.exports = routes;