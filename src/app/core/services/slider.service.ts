import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private sliderTemperature: number = 27;
  private sliderHumidity: number = 75;
  private sliderLight: number = 0;

  constructor() { }

  getSliderValue(paramName: string): any  {
    switch (paramName) {
      case ('temperature'):
        return this.sliderTemperature;
      case ('light'):
        return this.sliderLight;
      case ('humidity'):
        return this.sliderHumidity;
    }
  }

  setSliderValue(paramName: string, value: number): void {
    switch (paramName) {
      case ('temperature'):
        this.sliderTemperature = value;
        break;
      case ('light'):
        this.sliderLight = value;
        break;
      case ('humidity'):
        this.sliderHumidity = value;
        break;
    }
  }
}
