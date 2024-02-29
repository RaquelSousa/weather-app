import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  city: string = 'Lisbon';
  myWeather: any;
  temperature: number = 0;
  feelsLike: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  units: string = 'metric';
  searchCity = new FormControl('');

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.city);
  }

  onSearch(): void {
    console.log(this.searchCity.value);
    this.getWeatherData(this.searchCity.value || 'Lisbon');
    this.city = this.searchCity.value || 'Lisbon';
  }

  private getWeatherData(city: string) {
    this.weatherService.getWeather(city, this.units).subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = Math.round(this.myWeather.main.temp);
        this.feelsLike = Math.round(this.myWeather.main.feels_like);
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
        this.city = this.myWeather.name;

        this.iconURL = `https://openweathermap.org/img/wn/${this.myWeather.weather[0].icon}@2x.png`;
      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed'),
    });
  }
}
