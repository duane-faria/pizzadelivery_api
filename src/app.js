const express = require('express');
require('express-async-errors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const Youch = require('youch');
const cors = require('cors');
require('./database');
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exception();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  routes() {
    this.server.use(routes);
  }

  exception() {
    async function middleware(err, req, res, next) {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    }
    this.server.use(middleware);
  }
}

module.exports = new App().server;
