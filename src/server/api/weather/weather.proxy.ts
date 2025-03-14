import fetch from 'node-fetch';
import { Root } from '../../../types';
import 'dotenv/config';

export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
}

export const weatherProxy = async (city?: string): Promise<WeatherData> => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city || 'Izmail')}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City not found`);
    }
    throw new Error(`OpenWeatherMap API error: ${response.statusText}`);
  }

  const data: Root = await response.json() as Root;

  return {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };
}
