import { Component, Input } from '@angular/core';
import { Measurement } from 'src/app/core/interfaces/Measurement';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() tableHeaderOne: string = '';
  @Input() tableHeaderTwo: string = '';
  @Input() tableData: Measurement[] = [];
  @Input() unit: string | any = '';

  constructor() { }

  

}
