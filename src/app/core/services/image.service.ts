import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<any> {
    return this.http.post<FormData>(`${environment.API_URL}/plant/images`, formData);
  }

  getImages(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/plant/images`);
  }

  removeImage(imageName: string): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/plant/images/${imageName}`);
  }
}
