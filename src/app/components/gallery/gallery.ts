import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html'
})
export class Gallery {
  images = [
    { src: 'assets/images/area-de-musculacion.jpg', alt: 'Área de Musculación', span: 'col-span-1' },
    { src: 'assets/images/area-de-cardio.jpg', alt: 'Área de Cardio', span: 'col-span-1' },
    { src: 'assets/images/entrenamiento-funcional.jpg', alt: 'Entrenamiento Funcional', span: 'col-span-1' },
    { src: 'assets/images/zona-de-boxeo.jpg', alt: 'Zona de Boxeo', span: 'col-span-1' },
    { src: 'assets/images/maquinas-principales.jpg', alt: 'Máquinas Principales', span: 'col-span-1' },
    { src: 'assets/images/imagen-personas-entrenando.jpg', alt: 'Entrenamiento Libre', span: 'col-span-1' },
    { src: 'assets/images/discos-profesionales.jpg', alt: 'Discos y Pesas', span: 'col-span-1' },
    { src: 'assets/images/sacos-de-boxeo.jpg', alt: 'Sacos de Boxeo', span: 'col-span-1' }
  ];
}
