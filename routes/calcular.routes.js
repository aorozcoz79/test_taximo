const routes = require('express').Router();
const ctrl = require('../controllers/calcular.controller');
routes
    .get('/', (req, res) => { res.render('pages/home') })
    .post('/calcular', ctrl.calcular)

module.exports = routes;