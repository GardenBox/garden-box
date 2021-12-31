import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private http: HttpClient) { }

  getUserData(): Observable<User> {
    return this.http.get<User>(`${API_URL}/user`);
  }

  editPassword(email:string, newPassword: string): Observable<any>{
    console.log(newPassword);
    return this.http.patch<User>(`${API_URL}/user`, {email, newPassword})
  }
}
