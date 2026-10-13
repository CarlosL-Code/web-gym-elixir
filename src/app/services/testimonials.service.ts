import { Injectable } from '@angular/core';

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  timeClient: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  getTestimonials(): Testimonial[] {
    return [
      {
        id: 't1',
        name: 'Joel Cheuqueman',
        avatar: 'https://ui-avatars.com/api/?name=Joel+Cheuqueman&background=ea4335&color=fff&size=128&bold=true',
        comment: 'Excelente gimnasio. 5 estrellas en máquinas, ambiente motivador y la atención de todo el equipo.',
        rating: 5,
        timeClient: 'Opinión en Google · Hace 5 meses'
      },
      {
        id: 't2',
        name: 'Yanira Diaz',
        avatar: 'https://ui-avatars.com/api/?name=Yanira+Diaz&background=0284c7&color=fff&size=128&bold=true',
        comment: 'Muy buena experiencia en Elixir Gym. Máquinas de primer nivel, todo muy limpio y excelente ambiente para entrenar.',
        rating: 5,
        timeClient: 'Opinión en Google · Hace 1 mes'
      }
    ];
  }
}
