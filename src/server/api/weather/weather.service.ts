import e from 'express';
import { weatherProxy } from './weather.proxy';
import { logger } from '../../../logger';
import fetch from 'node-fetch';
import { Geolocation } from '../../../types';

export class WeatherService {
  public getWeatherByCity = async (
    req: e.Request,
    res: e.Response
  ): Promise<void> => {
    const cityParam = req.params.city || (req.query.city as string);

    if (!cityParam) {
      return await this.getWeatherByGeolocation(req, res);
    }
    return await this.getWeather(req, res, cityParam);
  };

  public getWeatherByGeolocation = async (req: e.Request, res: e.Response) => {
    const TOKEN = process.env.IP_INFO_TOKEN;

    try {
      const response = await fetch(`https://ipinfo.io/?token=${TOKEN}`);
      const data: Geolocation = (await response.json()) as Geolocation;
      return await this.getWeather(req, res, data.city);
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
    }
  };

  private getWeather = async (
    req: e.Request,
    res: e.Response,
    city: string
  ) => {
    try {
      const weatherData = await weatherProxy(city);
      return void res.render('weather.hbs', weatherData);
    } catch (e) {
      const error = e as Error;
      logger.error(error.message);
      if (error.message === 'City not found') {
        return void res
          .status(404)
          .render('error.hbs', { message: error.message });
      }
      return res.status(500).render('error.hbs', { message: error.message });
    }
  };
}
