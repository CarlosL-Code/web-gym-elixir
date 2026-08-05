import { Injectable } from '@angular/core';

export interface Plan {
  id: string;
  name: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  prices: {
    label: string;
    amount: string;
    color: string;
    textColor: string;
  }[];
  features: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  getPlans(): Plan[] {
    return [
      {
        id: 'general',
        name: 'Plan General',
        description: 'Acceso total a todas las instalaciones.',
        badge: 'BEST SELLER',
        badgeColor: 'bg-primary-container text-white',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyJwWS6642LGMXoyBIzJLMnRfAeLkAzOffSTmlnAHNUJdugI7jNaDmcm-gJnSNqK_LEAcRbCYUynS-Vq7MM-zk1IE-CPKdejRe7AWxbeKCfrlH9bZWU3yOaobeaIA3hz7-AFfFlzY1Qw42O_Coc4oSifiwdgi6qBxchDObQiQnldL9IPgTBkSlSmLkU1IXWMww63me_xhyjT7qmpUdqo2NxgfkNGwq3x47Oh00NFCdtgANud4vvG8qcU_7q1UUzc1E2SM',
        prices: [
          { label: 'MENSUAL', amount: '$28.000', color: 'border-mint-accent', textColor: 'text-mint-accent' },
          { label: 'BIMESTRAL', amount: '$50.000', color: 'border-yellow-400', textColor: 'text-yellow-400' },
          { label: 'TRIMESTRAL', amount: '$66.000', color: 'border-vibrant-pink', textColor: 'text-vibrant-pink' }
        ],
        features: ['Horario Libre', 'Sin Matrícula'],
        ctaText: 'SELECCIONAR',
        ctaLink: 'https://wa.me/56991832903?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20por%20el%20Plan%20General%20de%20%2428.000%20visto%20en%20el%20sitio%20web.'
      },
      {
        id: 'universitario',
        name: 'Universitario',
        description: 'Con Certificado o Pase',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPIjqlvXb_hw2h7fKn11F_wzgHYpyxxjRnFC0Ntqa5tdPmAnQpJt8x4e58Kzs-BrGHvRRdxwF6bKmrmZAVdg9ipqwzhQ-ntQ4tpVVfTky3KpuePlNnqe-TTDpQO0Kel6dMFpfluTwLsCFUPfRwMVKWFFbuxsoAsgfabezkF3RcXQHUh2riaHYBDMJ66PxXfXJUcTh9DWSTSNYADAsrsrTnrqnWH20eeCtAdoy4RAop1TX2NCo2isHgVpiGiMjdbbu5eZw',
        prices: [
          { label: 'PAGO MENSUAL', amount: '$22.000', color: 'border-electric-blue/20', textColor: 'text-electric-blue' }
        ],
        features: ['Horario Libre', 'Sin Matrícula'],
        ctaText: 'SELECCIONAR',
        ctaLink: 'https://wa.me/56991832903?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20por%20el%20Plan%20Universitario%20de%20%2422.000%20visto%20en%20el%20sitio%20web.'
      },
      {
        id: 'escolares',
        name: 'Escolares',
        description: '14 a 18 años con pase',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwymJf6Ig79zo_0SPd8zr2MHsA0ntEIshhUpWGrW45gT4KDbFzlbW2X1hhqdk96LjDsL9r-teE6QcT355tDfN0m51AGuZFC-GPf9p65zAWRBvThXkW3e_jFtZ59Ce_CKsn2zR1BhjzkcoKKRoX7z2qfM4L8-sa-eC1Ig6ByMFwIxxuQoM6cfHDOX5bm-KPOIPm8G3CC9L_Nod523bCrYz76glBoMyi7-7CXYecUEcGLlxsGpf2qo2iPTWYIUQYu3suwt8',
        prices: [
          { label: 'PLAN LIBRE', amount: '$20.000', color: 'border-mint-accent', textColor: 'text-mint-accent' },
          { label: 'RESTRINGIDO', amount: '$15.000', color: 'border-white/20', textColor: 'text-on-surface-variant' }
        ],
        features: ['Evaluación inicial', 'Plan de entrenamiento'],
        ctaText: 'SELECCIONAR',
        ctaLink: 'https://wa.me/56991832903?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20por%20el%20Plan%20Escolar%20visto%20en%20el%20sitio%20web.'
      },
      {
        id: 'adulto-mayor',
        name: 'Adulto Mayor',
        description: 'Entrenamiento Adaptado',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFIVOhNqc2sWJ1NTRGvXqq4A7ImbVIjm2ErH5fF6NuQ7kzsg0e3TA0YeXjmIFbORVCYn8xP-UBNLjKYtopFXY1r9ACCIPOhBg7NlKtyV4XhQNfHODiorm1BoVwLy6SHf34eTTOpGOa-R0brQc7PJmhaODdBPVFbbmReygDP2S25UH5mUsqPp9Gvp4JVMKBuV5FOcjRBpetSA0f1dwj7FaGowv2SitbVYzpQuIvT_4_05FVWhLhc_sYTaDb41lX0c7nZU0',
        prices: [
          { label: 'PLAN MENSUAL', amount: '$15.000', color: 'border-yellow-400/20', textColor: 'text-yellow-400' }
        ],
        features: ['Supervisión Especial', 'Sin Matrícula'],
        ctaText: 'SELECCIONAR',
        ctaLink: 'https://wa.me/56991832903?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20por%20el%20Plan%20Adulto%20Mayor%20de%20%2415.000%20visto%20en%20el%20sitio%20web.'
      }
    ];
  }
}
