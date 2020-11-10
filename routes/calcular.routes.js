const routes = require('express').Router();
const ctrl = require('../controllers/calcular.controller');
routes
    .get('/', (req, res) => { res.render('pages/home') })
    .post('/send', ctrl.send)

module.exports = routes;