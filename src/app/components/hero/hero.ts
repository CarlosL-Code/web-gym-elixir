import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface Slide {
  id: number;
  layout: 'left' | 'center' | 'right';
  tagline: string;
  tagIcon?: string;
  tagImage?: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight?: string;
  subtitle: string;
  btn1Text: string;
  btn1Link: string;
  btn1Icon?: string;
  btn2Text?: string;
  btn2Link?: string;
  btn2Icon?: string;
  bgImage: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  slides: Slide[] = [
    {
      id: 0,
      layout: 'center',
      tagline: 'MONTT #1027 (3ER PISO) • TEMUCO, CHILE',
      tagIcon: 'bi-geo-alt-fill',
      tagImage: 'https://flagcdn.com/w40/cl.png',
      titleLine1: 'ELIXIR GYM',
      titleLine2: 'GIMNASIO EN',
      titleHighlight: 'TEMUCO, CHILE',
      subtitle: 'Experimenta el alto rendimiento en el corazón de la ciudad. Un espacio diseñado para atletas reales que buscan resultados excepcionales.',
      btn1Text: 'PRUEBA GRATIS',
      btn1Link: 'https://wa.me/56991832903?text=Hola%2C%20me%20gustaría%20solicitar%20una%20clase%20de%20prueba%20en%20Elixir%20Gym.',
      btn1Icon: 'bi-ticket-perforated-fill',
      btn2Text: 'VER PLANES',
      btn2Link: '#plans',
      btn2Icon: 'bi-arrow-down',
      bgImage: '/assets/images/imagen-personas-entrenando.jpg'
    },
    {
      id: 1,
      layout: 'center',
      tagline: 'NUEVAS CLASES',
      tagIcon: 'bi-lightning-fill',
      titleLine1: 'BOXEO ELIXIR',
      titleLine2: 'CLASES DINÁMICAS',
      titleHighlight: 'Y EXPLOSIVAS',
      subtitle: 'Domina la técnica, mejora tu resistencia y libera el estrés con nuestros planes personalizados de boxeo y acondicionamiento.',
      btn1Text: 'ENTRENA COMO CAMPEÓN',
      btn1Link: 'https://wa.me/56991832903?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20las%20clases%20de%20Boxeo.',
      btn1Icon: 'bi-whatsapp',
      btn2Text: 'VER PLANES',
      btn2Link: '#plans',
      btn2Icon: 'bi-arrow-down',
      bgImage: '/assets/post/boxeo.jpeg'
    },
    {
      id: 2,
      layout: 'center',
      tagline: 'OFERTA LIMITADA (2 AL 5 DE OCTUBRE)',
      tagIcon: 'bi-tag-fill',
      titleLine1: 'CYBER DAY',
      titleLine2: 'PRECIOS ÚNICOS',
      titleHighlight: 'Y DESCUENTOS',
      subtitle: 'No dejes pasar estas excelentes promociones. Congela tu membresía anual o semestral con descuentos exclusivos solo por estos días.',
      btn1Text: 'APROVECHAR OFERTA',
      btn1Link: 'https://wa.me/56991832903?text=Hola,%20quiero%20aprovechar%20las%20promociones%20del%20Cyber%20Day.',
      btn1Icon: 'bi-fire',
      btn2Text: 'VER PLANES',
      btn2Link: '#plans',
      btn2Icon: 'bi-arrow-down',
      bgImage: '/promo-bg.jpg'
    }
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 7000);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.startAutoPlay(); // Reset timer upon manual interaction
  }
}
