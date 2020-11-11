const routes = require('express').Router();
const ctrl = require('../controllers/calcular.controller');
routes
    .post('/synchronous_shopping', ctrl.calcular)

module.exports = routes;