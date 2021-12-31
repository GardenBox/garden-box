import { Injectable } from '@angular/core';
import { MenuItem } from './../interfaces/MenuItem';

const MENU_ITEMS: MenuItem[] = [
  {
    iconName: 'home',
    title: 'Strona główna',
    link: 'panel',
    category: '',
    name: ''
  },
  {
    iconName: 'thermostat',
    title: 'Temperatura',
    name: 'temperature',
    link: 'temperatura',
    unit: '°C',
    minSliderValue: 15,
    maxSliderValue: 40,
    category: 'parameters',
    color:'#D5FDCB',
    backgroundColor: '#38AA73'
  },
  {
    iconName: 'air',
    title: 'Powietrze',
    name: 'air',
    link: 'powietrze',
    unit: '%',
    category: 'parameters',
    color:'#136B41',
    backgroundColor: '#C8F6BC'
  },
  {
    iconName: 'emoji_objects',
    title: 'Oświetlenie',
    name: 'light',
    link: 'oświetlenie',
    unit: 'lm',
    minSliderValue: 0,
    maxSliderValue: 350,
    category: 'parameters',
    color: '#A9DFFE',
    backgroundColor: '#0D77B4'
  },
  {
    iconName: 'water_drop',
    title: 'Wilgotność',
    name: 'humidity',
    link: 'wilgotność',
    unit: '%',
    minSliderValue: 0,
    maxSliderValue: 100,
    category: 'parameters',
    color: '#0D77B4',
    backgroundColor: '#A9DFFE'
  },
  {
    iconName: 'bar_chart',
    title: 'Statystyki',
    link: 'statystyki',
    category: 'others',
    name: ''
  },
  {
    iconName: 'image',
    title: 'Galeria',
    link: 'galeria',
    category: 'others',
    name: ''
  },
  {
    iconName: 'person',
    title: 'Moje konto',
    link: 'moje-konto',
    category: 'others',
    name: ''
  },
  {
    iconName: 'info',
    title: 'Informacje',
    link: 'informacje',
    category: 'others',
    name: ''
  }
]

@Injectable({
  providedIn: 'root'
})

export class MenuItemsService {

  constructor() { }

  getMenuItems() {
    return MENU_ITEMS;
  }
}
