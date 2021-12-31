import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnChanges, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ChartType } from 'src/app/core/enums/chartType';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common'
import { MenuItemsService } from 'src/app/core/services/menu-items.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { Subscription } from 'rxjs';
import { Measurement } from 'src/app/core/interfaces/Measurement';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { ChartService } from 'src/app/core/services/chart.service';
import { SliderService } from 'src/app/core/services/slider.service';
import { ChartOptions } from 'src/app/core/interfaces/ChartOptions';
import { ModeService } from 'src/app/core/services/mode.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChildren('slider') slider: {value: number} = {value: 0};

  mode: boolean = false;
  sliderLoaded: boolean = false;
  sliderValue: number | undefined;
  currentMeasurementValue: number | undefined;
  chartType = ChartType;
  dataChart: (string|number)[][] = [];
  data: Measurement[] = [];
  link: string = '';
  parameter: MenuItem;
  subscription: Subscription = new Subscription();
  chartOptions: ChartOptions;
  resultsLimit: number = 15;

  constructor(
    private chartService: ChartService, 
    private socketService: SocketService, 
    private measurementsService: MeasurementsService, 
    private menuItemService: MenuItemsService, 
    public breakpointObserver: BreakpointObserver, 
    private location: Location,
    private sliderService: SliderService,
    private modeService: ModeService) { 
  }

  ngOnChanges() {
    if(this.parameter.name) this.sliderValue = this.sliderService.getSliderValue(this.parameter.name)
  }

  ngOnInit(): void {
    console.log('herre')
    this.getLink();
    this.getParameter();
    this.subscription.add(this.socketService.listenParameter(this.parameter.name)
      .pipe(
        // distinctUntilChanged((prev, curr) => prev.value === curr.value),
        filter((data: Measurement) => data.name === this.parameter.name)
      ).subscribe((data: Measurement) => {
        this.currentMeasurementValue = data.value;
        // console.log(data)
      }));
    this.socketService.emitValue(this.parameter.name,this.slider.value);
    this.sliderValue = this.sliderService.getSliderValue(this.parameter.name);
    console.log(this.sliderValue)
    this.updateValue(this.slider);
    this.mode = this.modeService.getMode(this.parameter.name);
    setTimeout(() => {
      this.sliderLoaded = true;
    }, 10);

    this.measurementsService.getMeasurement(this.parameter.name, this.resultsLimit)
      .subscribe((data: Measurement[]) =>{
        this.data = data;
        this.dataChart = this.chartService.createDataForChart(this.data);
        this.updateOptionTitle();
      }
    )
  }

  getLink(): void {
    this.link = this.extractChildUrl(this.location.path());
  }

  getParameter(): void {
    const parameter = this.menuItemService.getMenuItems().find((item: MenuItem) => item.link === this.link);
    if (parameter) this.parameter = parameter;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.socketService.removeListeners();
  }

  updateOptionTitle(): void {
    const title = `${this.parameter.title} [${this.parameter.unit}]`;
    this.chartOptions = this.chartService.getChartOptions();
    this.chartOptions.vAxis.title = title;
    this.dataChart = Object.assign([], this.dataChart);
  }

  extractChildUrl(path: string): string {
    let newPath = path.substring(1);
    const slashIndex = newPath.indexOf('/');
    newPath = newPath.substring(slashIndex + 1);
    return decodeURI(newPath);
  }

  updateValue(event: any): void {
    this.slider.value = event?.value;
    this.socketService.emitInitialValue(this.parameter.name, this.slider.value);
    this.sliderService.setSliderValue(this.parameter.name, this.slider.value);
  }

  formatLabel(value: number): number {
    if (!value) return 0;
    return value;
  }

  setMode() {
    console.log(!this.mode)
    this.modeService.setMode(this.parameter.name, !this.mode);
  }

}
