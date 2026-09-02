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
        name: 'Javier Soto',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        comment: 'Elixir Gym no es solo un lugar para entrenar, es una comunidad. Las máquinas están siempre en excelente estado y el ambiente te motiva a empujar tus límites cada día.',
        rating: 5,
        timeClient: 'Socio hace 3 meses'
      },
      {
        id: 't2',
        name: 'Camila Herrera',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        comment: 'He probado varios gimnasios en Temuco y ninguno se compara. La asesoría de los profesores es real, se nota que se preocupan por tus avances y tu técnica.',
        rating: 5,
        timeClient: 'Socia hace 8 meses'
      },
      {
        id: 't3',
        name: 'Diego Araneda',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        comment: 'Excelente ubicación y los horarios son perfectos para ir antes o después del trabajo. La zona de peso libre es súper completa.',
        rating: 4,
        timeClient: 'Socio hace 5 meses'
      }
    ];
  }
}
