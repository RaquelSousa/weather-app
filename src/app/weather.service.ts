import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getWeather(city: string, units: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c5a62bdbd1173e93b997dc2e44cd7f9&units=${units}`
    );
  }
}
