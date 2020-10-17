const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json')
require('./database');
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
