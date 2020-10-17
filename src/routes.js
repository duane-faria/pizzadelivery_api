const { Router } = require('express');
const models = require('./app/controllers');
const routes = new Router();

routes.get('/', (req, res) => res.send('ola mundo'));

routes.post('/user', models.UserController.store);

routes.post('/session', models.SessionController.store);

routes.post('/product', models.ProductController.store);
routes.delete('/product/:id', models.ProductController.delete);
routes.get('/product', models.ProductController.index);

routes.post('/productType', models.ProductTypeController.store);
routes.get('/productType', models.ProductTypeController.index);

routes.post('/productSize', models.ProductSizeController.store);
routes.get('/productSize', models.ProductSizeController.index);

module.exports = routes;
