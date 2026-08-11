import { Injectable } from '@angular/core';

export interface TrainerStat {
  label: string;
  value: string;
}

export interface TrainerCertification {
  title: string;
  issuer: string;
  year: string;
  image?: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  shortDescription: string;
  fullDescription: string;
  experience: string;
  image: string;
  images?: string[];
  videoUrl?: string;
  whatsapp?: string;
  stats?: TrainerStat[];
  modalities?: string[];
  formation?: string[];
  certifications?: TrainerCertification[];
  socials?: {
    instagram?: string;
    facebook?: string;
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
        shortDescription: 'Profesional certificado con más de 5 años de experiencia, enfocado en potenciar tus habilidades al máximo.',
        fullDescription: 'Profesional certificado con más de 5 años de experiencia en preparación física y entrenamiento personalizado. Enfocado en ayudarte a alcanzar tus objetivos a través de metodologías de alta intensidad, planificación periodizada y seguimiento constante de tu progreso.',
        experience: '+5 años',
        image: '/perfil-1.jpg',
        images: ['/perfil-1.jpg', '/perfil-2.jpg', '/perfil-3.jpg'],
        videoUrl: '/video-gym.mp4',
        whatsapp: '56962478753',
        modalities: [
          'Entrenamiento de fuerza',
          'Acondicionamiento físico',
          'Planificación deportiva',
          'Entrenamiento funcional'
        ],
        socials: {
          instagram: '#'
        }
      },
      {
        id: 'trainer-2',
        name: 'Lorenzo Hernández',
        specialty: 'Entrenamiento Funcional',
        shortDescription: 'Especialista en entrenamiento funcional y acondicionamiento físico integral.',
        fullDescription: 'Especialista en entrenamiento funcional y acondicionamiento físico. Diseña rutinas personalizadas y progresivas para llevar tu rendimiento al siguiente nivel, adaptando cada sesión a tus necesidades, objetivos y nivel físico actual.',
        experience: '+3 años',
        image: '/personal/lorenzo-1.jpg',
        images: ['/personal/lorenzo-1.jpg', '/personal/lorenzo-2.jpg', '/personal/lorenzo-3.jpg'],
        whatsapp: '56975144096',
        modalities: [
          'Entrenamiento funcional',
          'Acondicionamiento físico',
          'Movilidad y flexibilidad',
          'Entrenamiento en circuito'
        ],
        socials: {
          instagram: '#'
        }
      },
      {
        id: 'trainer-3',
        name: 'Exabiel Cartas',
        specialty: 'Entrenador de Boxeo',
        shortDescription: 'Más de 10 años formando boxeadores. Ex atleta de alto rendimiento con 124 combates en boxeo amateur.',
        fullDescription: 'Cuenta con más de 10 años de experiencia como entrenador de boxeo. Fue atleta de alto rendimiento en boxeo amateur con una trayectoria competitiva de 124 combates. Ha realizado formación y cursos especializados en entrenamiento de boxeo en Cuba, Uruguay y Venezuela. Su metodología abarca desde las bases técnicas del boxeo recreativo hasta la preparación de atletas competitivos.',
        experience: '+10 años',
        image: '/personal/exabiel-1.jpg',
        images: ['/personal/exabiel-1.jpg', '/personal/exabiel-2.jpg'],
        videoUrl: '/personal/video-exabiel.mp4',
        whatsapp: '56975259660',
        stats: [
          { label: 'Años de experiencia', value: '+10 años' },
          { label: 'Combates amateur', value: '124' },
          { label: 'Formación en', value: 'Cuba · Uruguay · Venezuela' }
        ],
        modalities: [
          'Boxeo recreativo',
          'Boxeo competitivo',
          'Entrenamiento para niños',
          'Entrenamiento para jóvenes y adolescentes',
          'Boxeo recreativo infantil sin contacto'
        ],
        certifications: [
          {
            title: 'Licencia de Entrenador de Boxeo',
            issuer: 'Comisión Uruguaya de Boxeo Amateur y Profesional — Uruguay',
            year: '2026',
            image: '/personal/licencia-exabiel.jpg'
          },
          {
            title: 'Diploma de Entrenador',
            issuer: 'Certificación Técnica en Boxeo',
            year: '2026',
            image: '/personal/diploma-exabiel.jpg'
          }
        ],
        socials: {
          instagram: '#'
        }
      }
    ];
  }
}
