import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';

@Component({
  selector: 'app-parameter-title',
  templateUrl: './parameter-title.component.html',
  styleUrls: ['./parameter-title.component.scss']
})
export class ParameterTitleComponent implements OnInit {

  @Output() selectedParam: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  parameters: MenuItem[] = [];
  parametersTitle: string[] = [];
  selectedParameter: MenuItem | any;

  constructor(private menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: MenuItem )=> (item.category == 'parameters' || item.name == 'container') );
    this.menuItemsService.getMenuItems().forEach((item: MenuItem) => {
      if (item.category === 'parameters' || item.name === 'container') {
        this.parametersTitle.push(item.title)
      }
    });
    this.selectedParameter = this.parameters[0];
    // this.selectedParam.emit(this.selectedParameter);
  }

  selectTitle(title: string) {
    this.selectedParameter = this.parameters.find((param:MenuItem) => param.title === title);
    this.selectedParam.emit(this.selectedParameter);
  }
}
