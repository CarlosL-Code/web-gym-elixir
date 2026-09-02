import { Injectable } from '@angular/core';

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  getPartners(): Partner[] {
    return [
      { id: 'fenpruss', name: 'Fenpruss', logoUrl: '/assets/logos/fenpruss.png' },
      { id: 'municipalidad-plc', name: 'Municipalidad de Padre Las Casas', logoUrl: '/assets/logos/municipalidad-padre-las-casas.png' },
      { id: 'bienestar-salud-municipal', name: 'Bienestar Salud Municipal', logoUrl: '/assets/logos/bienestar-salud-municipal.png' },
      { id: 'servicio-bienestar-plc', name: 'Servicio de Bienestar Municipal PLC', logoUrl: '/assets/logos/servicio-bienestar-municipal-plc.png' },
      { id: 'medbalance', name: 'MedBalance', logoUrl: '/assets/logos/medbalance.png' },
    ];
  }
}
