const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => res.send('ola mundo'));

module.exports = routes;
