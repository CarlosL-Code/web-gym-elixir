import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.html'
})
export class Schedule {
  days = [
    { name: 'LUN', hours: '06:30 - 22:00', active: true },
    { name: 'MAR', hours: '06:30 - 22:00', active: true },
    { name: 'MIE', hours: '06:30 - 22:00', active: true },
    { name: 'JUE', hours: '06:30 - 22:00', active: true },
    { name: 'VIE', hours: '06:30 - 22:00', active: true },
    { name: 'SÁB', hours: '09:30 - 15:00', active: true, highlight: true },
    { name: 'DOM', hours: 'CERRADO', active: false }
  ];
}
