import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ParameterComponent } from './parameter/parameter.component';
import { InfoComponent } from './info/info.component';
import { StatsComponent } from './stats/stats.component';
import { GalleryComponent } from './gallery/gallery.component';

const childRoutes: Routes = [
  { path: 'temperatura', component: ParameterComponent },
  { path: 'wilgotność', component: ParameterComponent },
  { path: 'oświetlenie', component: ParameterComponent },
  { path: 'powietrze', component: ParameterComponent },
  { path: 'zbiornik', component: ParameterComponent },
  { path: 'statystyki', component: StatsComponent },
  { path: 'informacje', component: InfoComponent },
  { path: 'moje-konto',component: MyAccountComponent },
  { path: 'galeria',component: GalleryComponent }
];
const routes: Routes = [
  { path: '', component: DashboardComponent, children: childRoutes }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
