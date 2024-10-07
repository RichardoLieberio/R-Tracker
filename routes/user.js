const express = require('express');

const routes = express.Router();

routes.get('/', function() {
    console.log('User route');
});

module.exports = routes;