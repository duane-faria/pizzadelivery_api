const { Router } = require('express');
const models = require('./app/controllers');
const routes = new Router();

routes.get('/', (req, res) => res.send('ola mundo'));
routes.post('/user', models.UserController.store);
routes.post('/session', models.UserController.store);


module.exports = routes;
