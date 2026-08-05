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
        question: '¿Necesito experiencia para comenzar?',
        answer: 'No, recibimos a personas de todos los niveles. Nuestros entrenadores te guiarán en todo momento, adaptando los ejercicios a tus capacidades y asegurándose de que aprendas la técnica correcta desde el primer día.'
      },
      {
        id: 'faq-2',
        question: '¿Puedo probar antes de inscribirme?',
        answer: '¡Por supuesto! Ofrecemos un día de prueba gratuito para que conozcas nuestras instalaciones, el ambiente y converses con nuestros profesionales antes de tomar una decisión.'
      },
      {
        id: 'faq-3',
        question: '¿Qué incluye la membresía?',
        answer: 'Todas las membresías incluyen acceso completo a la sala de musculación, área de cardio, y uso de baños/vestidores. La asesoría de sala también está incluida. Las clases especiales pueden variar según el plan.'
      },
      {
        id: 'faq-4',
        question: '¿Tienen entrenadores personales?',
        answer: 'Sí, contamos con un equipo de entrenadores personales (Personal Trainers) que ofrecen sesiones 1 a 1. Este servicio se coordina y paga directamente con el profesional elegido.'
      },
      {
        id: 'faq-5',
        question: '¿Qué horarios tienen?',
        answer: 'Estamos abiertos de lunes a viernes desde las 06:30 hasta las 22:00 horas, y los sábados de 09:00 a 16:00 horas. Domingos y festivos el gimnasio permanece cerrado.'
      },
      {
        id: 'faq-6',
        question: '¿Cómo puedo cancelar mi membresía?',
        answer: 'Si tienes un plan mensual automático, puedes cancelarlo avisando con al menos 10 días de anticipación antes de tu fecha de cobro directamente en recepción o por WhatsApp.'
      }
    ];
  }
}
