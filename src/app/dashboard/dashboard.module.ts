import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { PanelMenuItemComponent } from './panel-menu-item/panel-menu-item.component';
import { TopbarComponent } from './topbar/topbar.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { InfoComponent } from './info/info.component';
import { MeasurementsService } from '../core/services/measurements.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { MainParameterComponent } from './main-parameter/main-parameter.component';
import { MainChartComponent } from './main-chart/main-chart.component';
import { PlantInfoComponent } from './plant-info/plant-info.component';
import { MainInfoComponent } from './main-info/main-info.component';
import { MainTableComponent } from './main-table/main-table.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ParameterTitleComponent } from './parameter-title/parameter-title.component';
import { ParameterComponent } from './parameter/parameter.component';
import { GaugeModule } from 'angular-gauge';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from '../core/services/socket.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EmptyDataComponent } from './empty-data/empty-data.component';
import { environment } from 'src/environments/environment';
import { GalleryComponent } from './gallery/gallery.component';
import { TableComponent } from './table/table.component';

const SOCKET_URL = environment.SOCKET_URL;
const config: SocketIoConfig = { url: SOCKET_URL, options: {transports: ['websocket'], upgrade: false} };
@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    BottomBarComponent,
    PanelMenuItemComponent,
    StatsComponent,
    MyAccountComponent,
    InfoComponent,
    SidenavComponent,
    SidenavItemComponent,
    MainParameterComponent,
    MainChartComponent,
    PlantInfoComponent,
    MainInfoComponent,
    MainTableComponent,
    ParameterTitleComponent,
    ParameterComponent,
    EmptyDataComponent,
    GalleryComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    GoogleChartsModule,
    ReactiveFormsModule,
    GaugeModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  exports: [
    SharedModule,
    GoogleChartsModule,
    GaugeModule
  ],
  providers: [
    MeasurementsService,
    SocketService,
    {
      provide: MAT_DATE_LOCALE, 
      useValue: 'pl-PL'
    },
  ]
})
export class DashboardModule { }
