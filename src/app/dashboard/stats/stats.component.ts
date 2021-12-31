import { Component, OnInit } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  selectedDate: Date;
  currentDate: Date;
  constructor(private measurementsService: MeasurementsService) { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.currentDate = new Date()
    const formattedDate = this.formatDate();
    this.measurementsService.dateSubject$.next(formattedDate);
  }

  onSelectedChange(event: any): void {
    this.selectedDate = event;
    const formattedDate = this.formatDate();
    this.measurementsService.dateSubject$.next(formattedDate);
  }

  formatDate(): string {
    const startDatePosition = 0;
    const endDatePosition = 10;
    let localeDate = new Date(this.selectedDate).toLocaleDateString('pl-PL');
    if (localeDate[1] == '.') localeDate = `0${localeDate}`;
    const dateAsArray = localeDate
      .substring(startDatePosition, endDatePosition)
      .split('.');
    const formattedDate = `${dateAsArray[2]}-${dateAsArray[1]}-${dateAsArray[0]}`;
    return formattedDate;
  }
}
