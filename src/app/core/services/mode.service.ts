import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  private modeTemperature: boolean = false;
  private modeHumidity: boolean = false;
  private modeLight: boolean = false;

  constructor() { }

  getMode(paramName: string): boolean {
    console.log(paramName)
    switch (paramName) {
      case ('temperature'):
        return this.modeTemperature;
      case ('light'):
        return this.modeLight;
      case ('humidity'):
        return this.modeHumidity;
      default:
        return false
    }
  }

  setMode(paramName: string, value: boolean): void {
    console.log(paramName)
    switch (paramName) {
      case ('temperature'):
        this.modeTemperature = value;
        break;
      case ('light'):
        this.modeLight = value;
        break;
      case ('humidity'):
        this.modeHumidity = value;
        break;
    }
  }
}
