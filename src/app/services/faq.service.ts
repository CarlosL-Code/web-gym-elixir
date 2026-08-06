import { Injectable } from '@angular/core';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  getFaqs(): FAQ[] {
    return [
      {
        id: 'faq-1',
        question: '¿Dónde está ubicado Elixir Gym?',
        answer: 'Nuestro gimnasio está ubicado en Manuel Montt 1027, Piso 3, en pleno centro de Temuco, Región de la Araucanía, Chile. Un espacio céntrico y de primer nivel para tu entrenamiento.'
      },
      {
        id: 'faq-2',
        question: '¿Qué planes de gimnasio tienen en Temuco?',
        answer: 'Ofrecemos membresías exclusivas enfocadas en el alto rendimiento. Contamos con planes generales, universitarios, escolares y para adultos mayores. Todas incluyen acceso a nuestra sala de musculación y áreas de entrenamiento libre.'
      },
      {
        id: 'faq-3',
        question: '¿Elixir Gym ofrece entrenamiento personalizado?',
        answer: 'Sí, contamos con un equipo experto de entrenadores personales. Si buscas un personal trainer en Temuco para alcanzar tus objetivos de fitness de manera estructurada, ofrecemos sesiones 1 a 1 coordinadas directamente con nuestros profesionales.'
      },
      {
        id: 'faq-4',
        question: '¿Cuál es el horario de Elixir Gym?',
        answer: 'Estamos abiertos para tus entrenamientos de lunes a viernes desde las 06:30 hasta las 22:00 horas, y los sábados de 09:00 a 16:00 horas. Domingos y festivos el gimnasio permanece cerrado.'
      },
      {
        id: 'faq-5',
        question: '¿Cómo puedo contactar al gimnasio?',
        answer: 'Puedes comunicarte con nosotros directamente por WhatsApp al +56 9 9183 2903, o visitarnos en nuestra sede en Temuco para que conozcas nuestras instalaciones de primer nivel antes de inscribirte.'
      }
    ];
  }
}
