import express from 'express';
import 'express-async-errors';
import * as Sentry from '@sentry/node';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    Sentry.init({
      dsn: 'https://4842a967766a49ec878d7cfccba14d60@sentry.io/1817642',
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

export default new App().server;
