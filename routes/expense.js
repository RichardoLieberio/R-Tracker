const express = require('express');

const validation = require('../validations/expense');
const controller = require('../controllers/expense');

const routes = express.Router();

module.exports = routes;