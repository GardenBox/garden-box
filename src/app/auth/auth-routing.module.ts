import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'zaloguj', component: AuthComponent,
  },  
  {
    path: 'rejestracja', component: AuthComponent,
  }, 
  {
    path: '',
    redirectTo: '/zaloguj',
    pathMatch: 'full' 
  },
  {
    path: '', component: AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }