import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, NgClass],
  providers: [WeatherService],
  template: `
    <div class="app" [ngClass]="weatherClass">
      <main>
        <div class="search-box">
          <input
            type="text"
            class="search-bar"
            placeholder="Search..."
            (change)="inputChange($event)"
          />
        </div>
        @if (weather) {
          <div class="location-box">
            <div class="location">
              {{weather.name}}, {{weather.sys.country}}
            </div>
            <div class="date">
              {{ today | date:'fullDate' }}
            </div>
          </div>
          <div class="weather-box">
            <div class="temp">
              {{ temperature }}°C
            </div>
            <div class="weather">
              {{weather.weather[0].main}}
            </div>
          </div>
        }
      </main>
    </div>
  `,
})
export class AppComponent {
  today = new Date();
  query = '';
  weather: any;

  get temperature() {
    return Math.round(this.weather?.main?.temp);
  }

  get weatherClass() {
    if (this.temperature >= 30) return 'warmest';
    if (this.temperature >= 24) return 'warm';
    if (this.temperature >= 17) return 'cold';
    return 'coldest';
  }

  constructor(private weatherService: WeatherService) {}

  async inputChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (value.trim()) {
      this.weather = await this.weatherService.getWeather(value);
    }
  }
}
