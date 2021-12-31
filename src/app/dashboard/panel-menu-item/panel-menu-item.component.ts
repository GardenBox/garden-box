import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel-menu-item',
  templateUrl: './panel-menu-item.component.html',
  styleUrls: ['./panel-menu-item.component.scss']
})

export class PanelMenuItemComponent {

  @Input() 
  title: string = '';

  @Input()
  iconUrl: string ='';

  @Input()
  link: string = '';

  @Input()
  iconName: string = '';

  constructor() { }
}
