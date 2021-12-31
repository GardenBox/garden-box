import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
      const token = window.localStorage.getItem('token');
      if(token) {
        this.router.navigateByUrl('/panel')
        return false;
      } else return true;
    }
  
}
