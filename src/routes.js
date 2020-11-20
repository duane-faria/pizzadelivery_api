const { Router } = require('express');
const models = require('./app/controllers');
const routes = new Router();
const auth = require('./app/middlewares/Authentication');

routes.get('/', (req, res) => res.send('ola mundo'));

routes.post('/user', models.UserController.store);
routes.get('/user', models.UserController.index);

routes.post('/session', models.SessionController.store);

routes.use(auth);

routes.post('/product', models.ProductController.store);
routes.delete('/product/:id', models.ProductController.delete);
routes.get('/product', models.ProductController.index);

routes.post('/productType', models.ProductTypeController.store);
routes.get('/productType', models.ProductTypeController.index);
routes.delete('/productType', models.ProductTypeController.delete);

routes.post('/productSize', models.ProductSizeController.store);
routes.get('/productSize', models.ProductSizeController.index);
routes.delete('/productSize', models.ProductSizeController.delete);

routes.get('/order', models.OrderController.index);
routes.get('/order/:userId', models.OrderController.getUserOrders);
routes.post('/order', models.OrderController.store);
routes.put('/order/:id', models.OrderController.update);

module.exports = routes;
