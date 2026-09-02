import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.html'
})
export class Schedule {
  days = [
    { name: 'LUNES', hours: '06:30 - 22:00', active: true },
    { name: 'MARTES', hours: '06:30 - 22:00', active: true },
    { name: 'MIÉRCOLES', hours: '06:30 - 22:00', active: true },
    { name: 'JUEVES', hours: '06:30 - 22:00', active: true },
    { name: 'VIERNES', hours: '06:30 - 22:00', active: true },
    { name: 'SÁBADO', hours: '09:30 - 15:00', active: true, highlight: true },
    { name: 'DOMINGO', hours: 'CERRADO', active: false }
  ];
}
