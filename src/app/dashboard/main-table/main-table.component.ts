import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  selectedParameter: MenuItem | any;
  parameters: MenuItem[] = [];
  data: any[] = [];

  constructor(
    private measurementsService: MeasurementsService, 
    private menuItemsService: MenuItemsService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems()
      .filter((item: MenuItem)=> item.category == 'parameters');
    this.selectedParameter = this.parameters[0];
    this.getMeasurement(this.selectedParameter);
    if(this.router.url === '/panel/statystyki') {
      this.getDateMeasurement();
    }
  }

  onSelectedParam(param: MenuItem) {
    this.selectedParameter = param;
    if(this.router.url == '/panel/statystyki') {
      this.getDateMeasurement();
    } else this.getMeasurement(this.selectedParameter);
  }

  getDateMeasurement(): void {
    this.measurementsService.dateSubject$.subscribe((choosenDate: string) => {
      this.measurementsService.getDateMeasurement(this.selectedParameter.name, choosenDate).subscribe(data => {
        this.data = data;
        // if(!this.data.length) this.empty = true;
      });
    })
  }

  getMeasurement(param: MenuItem, limit: number = 10) {
    this.measurementsService.getMeasurement(param.name, limit).subscribe(data => {
      this.data = data;
      // if(!this.data.length) this.empty = true;
    });
  }


}
