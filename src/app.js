import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';

import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.node_env = process.env.NODE_ENV || 'development';

    Sentry.init({
      dsn: 'https://4842a967766a49ec878d7cfccba14d60@sentry.io/1817642',
    });

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (this.node_env === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error :/' });
    });
  }
}

export default new App().server;
