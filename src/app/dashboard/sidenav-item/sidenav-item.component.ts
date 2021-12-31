import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent {

  @Input() item: MenuItem;
  selectedItem: string = '';
  isActive: boolean = false;
  constructor() { }

  selectItem(itemName: string) {
    if (this.selectedItem == itemName) this.isActive = true;
  }

}
