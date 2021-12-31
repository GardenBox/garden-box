import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';

@Component({
  selector: 'app-main-parameter',
  templateUrl: './main-parameter.component.html',
  styleUrls: ['./main-parameter.component.scss']
})
export class MainParameterComponent implements OnInit, OnChanges {

  @Input() parameter: MenuItem;
  @Input() currentValue: any;
  value: number | undefined;
  constructor() { }

  ngOnInit(): void {
    this.value = this.currentValue;
  }

  ngOnChanges() {
    this.value = this.currentValue;
  }

}
