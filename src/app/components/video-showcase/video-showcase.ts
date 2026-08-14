import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-showcase.html',
  styleUrl: './video-showcase.css',
})
export class VideoShowcase {
  images = [
    { src: 'assets/images/area-de-musculacion.jpg', alt: 'Musculación' },
    { src: 'assets/images/zona-de-boxeo.jpg', alt: 'Boxeo' },
    { src: 'assets/images/entrenamiento-funcional.jpg', alt: 'Funcional' },
    { src: 'assets/images/area-de-cardio.jpg', alt: 'Cardio' }
  ];
}
