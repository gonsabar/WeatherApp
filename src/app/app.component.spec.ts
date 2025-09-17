import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherService } from '../services/weather.service';
import { WEATHER_MOCK } from '../mocks/weather-mock';

describe('AppComponent', () => {
  // Service spy
  let getWeatherSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    // Create new spy on each test
    getWeatherSpy = jasmine.createSpyObj('WeatherService', ['getWeather']);

    // Return the mock
    (getWeatherSpy.getWeather as jasmine.Spy).and.returnValue(Promise.resolve(WEATHER_MOCK));

    // The component is standalone and declare is own provider for the service, we need to force the component to use our provider.
    // We will use overrideComponent to replace the providers
    TestBed.overrideComponent(AppComponent as any, {
      set: {
        providers: [{ provide: WeatherService, useValue: getWeatherSpy }]
      }
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the query empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.query).toEqual('');
  });

  it('should render input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  });

  it('should call service when input change', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input') as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (!input) return;

    // Change the input value and dispatch the change event
    input.value = 'Barcelona';
    const event = new Event('change');
    input.dispatchEvent(event);

    await fixture.whenStable();

    // Use the spy
    expect(getWeatherSpy.getWeather).toHaveBeenCalledWith('Barcelona');
  });
});
