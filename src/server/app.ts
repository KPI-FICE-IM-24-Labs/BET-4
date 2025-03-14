import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from '../logger';
import { appRouter } from './api';

export class App {
  private readonly app: Express;
  public static instance: Express | undefined;

  constructor() {
    if (App.instance) {
      throw Error('App already initialized');
    }

    this.app = express();
    App.instance = this.app;
    this.setupMiddleware();
    this.setupRoutes();
    logger.info('App initialized successfully');
  }

  public listen(port: number, host: string) {
    this.app.listen(port, host, () => {
      logger.info(`Server listening on http://${host}:${port}`)
    });
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());

    logger.info('Middleware set up successfully');
  }

  private setupRoutes() {
    this.app.use(appRouter);
    logger.info('Routes set up successfully');
  }
}
