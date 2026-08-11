import { Injectable } from '@angular/core';

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  description: string;
  experience: string;
  image: string;
  images?: string[];
  videoUrl?: string;
  whatsapp?: string;
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
        name: 'Felipe Torres',
        specialty: 'Preparador Físico',
        description: 'Profesional certificado con más de 5 años de experiencia, enfocado en potenciar tus habilidades al máximo.',
        experience: '+5 años',
        image: '/perfil-1.jpg',
        images: ['/perfil-1.jpg', '/perfil-2.jpg', '/perfil-3.jpg'],
        videoUrl: '/video-gym.mp4',
        whatsapp: '56991832903',
        socials: {
          instagram: '#'
        }
      },
      {
        id: 'trainer-2',
        name: 'Lorenzo Hernández',
        specialty: 'Entrenamiento Funcional',
        description: 'Especialista en entrenamiento funcional y acondicionamiento físico. Diseña rutinas personalizadas para llevar tu rendimiento al siguiente nivel.',
        experience: '+3 años',
        image: '/personal/lorenzo-1.jpg',
        images: ['/personal/lorenzo-1.jpg', '/personal/lorenzo-2.jpg', '/personal/lorenzo-3.jpg'],
        whatsapp: '56991832903',
        socials: {
          instagram: '#'
        }
      },
      {
        id: 'trainer-3',
        name: 'Exabiel Cartas',
        specialty: 'Boxeo & Entrenamiento',
        description: 'Entrenador de boxeo especializado en técnica, defensa y acondicionamiento. Trabaja contigo desde cero o si ya tienes experiencia en el ring.',
        experience: '+4 años',
        image: '/personal/exabiel-1.jpg',
        images: ['/personal/exabiel-1.jpg', '/personal/exabiel-2.jpg'],
        whatsapp: '56991832903',
        socials: {
          instagram: '#'
        }
      }
    ];
  }
}
