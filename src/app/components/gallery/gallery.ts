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
    { src: 'assets/images/gym_weights.jpg', alt: 'Área de Musculación', span: 'md:col-span-2 md:row-span-2' },
    { src: 'assets/images/gym_cardio.jpg', alt: 'Área de Cardio', span: 'col-span-1 row-span-1' },
    { src: 'assets/images/gym_functional.jpg', alt: 'Entrenamiento Funcional', span: 'col-span-1 row-span-1' },
    { src: 'assets/images/gym_boxing.jpg', alt: 'Zona de Boxeo', span: 'md:col-span-2 row-span-1' }
  ];
}
