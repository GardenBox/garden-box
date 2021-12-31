import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  user: string = '';
  registrationInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${API_URL}/login`, {email, password})
    .pipe(
      tap((data: User) => {
      this.user = data.email
    }
    ));
  }

  registration(email: string, password: string): Observable<any>  {
    return this.http.post<User>(`${API_URL}/registration`, {email, password});
  }

  logout(): void {
    window.localStorage.clear();
    this.router.navigateByUrl('/logout');
  }
}
