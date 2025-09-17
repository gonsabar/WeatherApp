import { Injectable } from "@angular/core";

const api = {
  key: 'YOUR_API_KEY',
  base: 'https://api.openweathermap.org/data/2.5/'
}

@Injectable()
export class WeatherService {
  constructor() {}

  getWeather(query: string) {
    const url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
    return fetch(url)
    .then(res => res.json())
  }
}
