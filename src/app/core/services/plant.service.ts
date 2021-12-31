import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  editPlant(name: string): Observable<any> {
    return this.http.patch(`${API_URL}/plant`, {name});
  }

  getPlant(): Observable<any> {
    return this.http.get(`${API_URL}/plant`);
  }
}
