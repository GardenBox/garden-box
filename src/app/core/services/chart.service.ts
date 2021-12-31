import { Injectable } from '@angular/core';
import { ChartOptions } from '../interfaces/ChartOptions';
import { DataChart } from '../interfaces/DataChart';
import { Measurement } from '../interfaces/Measurement';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  private convertDate(createdAt: string): string {
    const date = createdAt.substring(11, 16);
    return date;
  }

  createDataForChart(measurements: Measurement[]): DataChart {
    let dataChart: DataChart = [];
    measurements.forEach((measurement: Measurement) => {
      const createdAt = this.convertDate(measurement.createdAt);
      dataChart.push([createdAt, measurement.value]);
    });
    return dataChart;
  }

  getChartOptions(): ChartOptions {
    const chartOptions = {
      colors: ['#38AA73'],
      legend: {
        position: 'none' 
      },
      hAxis: {
        title: 'Godzina',
        titleTextStyle: {
          italic: false,
        }
      },
      vAxis: {
        title: '',
        titleTextStyle: {
          italic: false,
        }
      }
    };

    return chartOptions;
  }
}
