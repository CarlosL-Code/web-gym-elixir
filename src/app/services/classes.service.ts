import { Injectable } from '@angular/core';

export interface GymClass {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  getClasses(): GymClass[] {
    return [
      {
        id: 'musculacion',
        name: 'Musculación',
        description: 'Sala de máquinas completa con marcas líderes para hipertrofia y fuerza.',
        icon: 'fitness_center'
      },
      {
        id: 'hiit',
        name: 'HIIT & Cardio',
        description: 'Zona cardiovascular y espacios para entrenamiento funcional de alta intensidad.',
        icon: 'speed'
      },
      {
        id: 'asesoria',
        name: 'Asesoría',
        description: 'Instructores capacitados para guiar tu técnica y optimizar tus objetivos.',
        icon: 'monitoring'
      },
      {
        id: 'boxeo',
        name: 'Boxeo',
        description: 'Espacio dedicado al boxeo recreativo y formativo para todos los niveles.',
        icon: 'sports_mma'
      }
    ];
  }
}
