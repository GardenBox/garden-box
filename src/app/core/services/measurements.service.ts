import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Measurement } from '../interfaces/Measurement';
interface GeneralMeasurement {
  createdAt: string
  value: number,
}
@Injectable({
  providedIn: 'root'
})

export class MeasurementsService {

  dateSubject$: BehaviorSubject<string> = new BehaviorSubject(new Date().toISOString());

  constructor(private http: HttpClient) {}

  private getGeneralMeasurement(measurement: Measurement): GeneralMeasurement {
    const measurementValues = Object.values(measurement);
    const generalMeasurement: GeneralMeasurement = {
      value: measurementValues[0],
      createdAt: measurementValues[1]
    }
    return generalMeasurement;
  }

  getMeasurement(parameter: string, limit?: number): Observable<GeneralMeasurement[]> {
    limit ? limit: limit = 13;
    const params = new HttpParams().set('limit', limit)

    return this.http.get<any>(`${environment.API_URL}/${parameter}/oneDay`, {params})
      .pipe(map(data => {
        return data.map((measurement: Measurement) => {
          return this.getGeneralMeasurement(measurement);
        });
    })
    );
  }

  getDateMeasurement(parameter: string, date: string): Observable<GeneralMeasurement[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<any>(`${environment.API_URL}/${parameter}`, { params })
      .pipe(
        map(data => {
        return data.map((measurement: Measurement) => {
          return this.getGeneralMeasurement(measurement);
        });
    }));
  }

}


