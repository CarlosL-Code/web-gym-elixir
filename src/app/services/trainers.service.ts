import { Injectable } from '@angular/core';

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  description: string;
  experience: string;
  image: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TrainersService {
  getTrainers(): Trainer[] {
    return [
      {
        id: 'trainer-1',
        name: 'Carlos Mendoza',
        specialty: 'Head Coach & Fuerza',
        description: 'Especialista en levantamiento de potencia y acondicionamiento físico de alto rendimiento.',
        experience: '+10 años',
        image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400&h=400',
        socials: {
          instagram: '#'
        }
      },
      {
        id: 'trainer-2',
        name: 'Valentina Rojas',
        specialty: 'HIIT & Funcional',
        description: 'Enfocada en mejorar la resistencia cardiovascular y la agilidad mediante entrenamientos dinámicos.',
        experience: '6 años',
        image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400&h=400',
        socials: {
          instagram: '#'
        }
      },
      {
        id: 'trainer-3',
        name: 'Andrés Silva',
        specialty: 'Boxeo & Artes Marciales',
        description: 'Entrenador certificado en boxeo recreativo y competitivo. Mejora tu técnica y libera estrés.',
        experience: '8 años',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400&h=400',
        socials: {
          instagram: '#'
        }
      }
    ];
  }
}
