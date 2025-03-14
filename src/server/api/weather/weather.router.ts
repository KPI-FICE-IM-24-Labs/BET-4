import express from 'express';
import { WeatherService } from './weather.service';
import { logger } from '../../../logger';

export const weatherRouter = express.Router();
const weatherService = new WeatherService();

weatherRouter.get('/weather/:city', weatherService.getWeatherByCity);
weatherRouter.get('/weather', weatherService.getWeatherByCity);
logger.info('Weather router initialized');
