import { Injectable } from '@angular/core';

export interface Stat {
  id: string;
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  getStats(): Stat[] {
    return [
      {
        id: 's1',
        value: 500,
        prefix: '+',
        suffix: '',
        label: 'Socios activos'
      },
      {
        id: 's2',
        value: 10,
        prefix: '+',
        suffix: '',
        label: 'Entrenadores'
      },
      {
        id: 's3',
        value: 20,
        prefix: '+',
        suffix: '',
        label: 'Clases semanales'
      },
      {
        id: 's4',
        value: 5,
        prefix: '+',
        suffix: '',
        label: 'Años de experiencia'
      }
    ];
  }
}
