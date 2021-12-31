import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartType } from 'src/app/core/enums/chartType';
import { PlantService } from 'src/app/core/services/plant.service';
@Component({
  selector: 'app-plant-info',
  templateUrl: './plant-info.component.html',
  styleUrls: ['./plant-info.component.scss']
})
export class PlantInfoComponent implements OnInit, OnDestroy{

  @Input() currentValue: any = 100;
  subscription: Subscription;
  chartType: ChartType = ChartType.Bar;

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.subscription = this.plantService.getPlant().subscribe(data => {
      this.currentValue = this.countPlantGrowth(data.plant.createdAt);
    });
  }

  countPlantGrowth(createdAt: string): number {
    const milisecondsPerDay = 1000 * 60 * 60 * 24;
    const created = new Date(createdAt);
    const createdPlantDate = Date.UTC(created.getFullYear(), created.getMonth(), created.getDate());
    const currentDate = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const normalGrowthTime = 14;
    const comparedDate = Math.floor((currentDate - createdPlantDate) / milisecondsPerDay);
    let currentValue = Math.abs(Math.floor((comparedDate * 100) / normalGrowthTime));
    if (currentValue == 0) return 1;
    if (currentValue > 100) return 100;
    else return currentValue; 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
