import express from 'express';
import { AppService } from './app.service';
import { logger } from '../../logger';

export const appRouter = express.Router();
const appService = new AppService();

appRouter.get('/', appService.searchCity);
logger.info('App router initialized');
