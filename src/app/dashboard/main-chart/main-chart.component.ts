import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'src/app/core/interfaces/ChartOptions';
import { DataChart } from 'src/app/core/interfaces/DataChart';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { ChartService } from 'src/app/core/services/chart.service';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';
import { ChartType } from '../../core/enums/chartType';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit {

  chartType = ChartType;
  parameters: MenuItem[] = [];
  parametersTitle: string[] = [];
  selectedParameterTitle: string = '';
  selectedParameter: MenuItem;
  chartOptions: ChartOptions | any;
  dataChart: DataChart = [];
  resultsLimit: number = 13;

  constructor(private chartService: ChartService, private menuItemsService: MenuItemsService, private measurementsService: MeasurementsService, private router: Router) { }

  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: MenuItem) => item.category == 'parameters');
    this.selectedParameter = this.parameters[0];
    if(this.router.url == '/panel/statystyki') {
      this.getDateMeasurement();
    } else this.getMeasurement(this.selectedParameter);
    this.chartOptions = this.chartService.getChartOptions();
    this.chartOptions.vAxis.title = this.parameters[0].unit;
  }

  onSelectedParam(param: MenuItem): void {
    this.selectedParameter = param;
    if(this.router.url == '/panel/statystyki') {
      this.getDateMeasurement();
    } else this.getMeasurement(this.selectedParameter);
    this.chartOptions.vAxis.title = param.unit;
  }

  getMeasurement(param: MenuItem): void {
    this.measurementsService.getMeasurement(param.name as string, this.resultsLimit).subscribe(data => {
      this.dataChart = this.chartService.createDataForChart(data);
    })
  }

  getDateMeasurement(): void {
    this.measurementsService.dateSubject$.subscribe((choosenDate: string) => {
      this.measurementsService.getDateMeasurement(this.selectedParameter.name as string, choosenDate).subscribe(data => {
        let data2 = [
          {value: 60, createdAt: '2021-12-02 00:00:00'},
          {value: 65, createdAt: '2021-12-02 02:00:00'},
          {value: 64, createdAt: '2021-12-02 04:00:00'},
          {value: 63, createdAt: '2021-12-02 06:00:00'},
          {value: 62, createdAt: '2021-12-02 08:00:00'},
          {value: 61, createdAt: '2021-12-02 10:00:00'},
          {value: 70, createdAt: '2021-12-02 12:00:00'},
          {value: 69, createdAt: '2021-12-02 14:00:00'},
          {value: 64, createdAt: '2021-12-02 16:00:00'},
          {value: 67, createdAt: '2021-12-02 18:00:00'},
          {value: 66, createdAt: '2021-12-02 20:00:00'},
          {value: 74, createdAt: '2021-12-02 22:00:00'},

        ]
        this.dataChart = this.chartService.createDataForChart(data2);
      });
    })
  }

}
