import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.html'
})
export class Schedule {
  days = [
    { name: 'Lunes a Viernes', hours: '06:30 - 22:00', active: true, icon: 'bolt' },
    { name: 'Sábados', hours: '09:30 - 15:00', active: true, highlight: true, icon: 'wb_sunny' },
    { name: 'Domingos', hours: 'CERRADO', active: false, icon: 'bedtime' }
  ];
}
