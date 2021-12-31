import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private menuItemsService: MenuItemsService) { }

  menuItems: MenuItem[] = [];
  selectedItem: string = '';

  get parameters() {
    const parameters = this.menuItems.filter(item => item.category === 'parameters');
    return parameters;
  }

  get others() {
    const others = this.menuItems.filter(item => item.category === 'others');
    return others;
  }

  ngOnInit(): void {
    this.menuItems = this.menuItemsService.getMenuItems();
  }

  selectItem(itemName: string): void {
    this.selectedItem = itemName;
  }

}
