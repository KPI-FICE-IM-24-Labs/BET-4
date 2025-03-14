import e from 'express';
import { weatherProxy } from './weather.proxy';
import { logger } from '../../../logger';

export class WeatherService {
  public async getWeatherByCity(req: e.Request, res: e.Response): Promise<void> {
    const city = req.params.city || req.query.city as string;

    try {
      const weatherData = await weatherProxy(city);
      return void res.render('weather.hbs', weatherData);
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      if (error.message === 'City not found') {
        return void res.status(404).render('error.hbs', { message: error.message });
      }
      res.status(500).render('error.hbs', { message: error.message });
    }
  }
}
