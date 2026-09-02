import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestimonialsService, Testimonial } from '../../services/testimonials.service';

declare var window: any;

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonials.html'
})
export class Testimonials implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [];
  private testimonialsService = inject(TestimonialsService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  
  stars = [1, 2, 3, 4, 5];

  // Slider State
  currentIndex = 0;
  private intervalId: any;

  // Modal State
  isReviewModalOpen = false;
  
  // Review Data
  hoveredStar = 0;
  selectedStar = 0;
  reviewText = '';
  
  // User Data
  googleUser: any = null;

  ngOnInit() {
    this.testimonials = this.testimonialsService.getTestimonials();
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.nextTestimonial();
      }, 5000);
    }
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.cdr.detectChanges();
  }

  prevTestimonial() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.cdr.detectChanges();
  }

  setTestimonial(index: number) {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
    this.cdr.detectChanges();
  }

  openReviewModal(event: Event) {
    event.preventDefault();
    this.isReviewModalOpen = true;
    this.resetReview();
    
    if (isPlatformBrowser(this.platformId)) {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => this.initializeGoogleSignIn();
        document.head.appendChild(script);
      } else {
        setTimeout(() => this.initializeGoogleSignIn(), 100);
      }
    }
  }

  closeReviewModal() {
    this.isReviewModalOpen = false;
  }

  resetReview() {
    this.selectedStar = 0;
    this.hoveredStar = 0;
    this.reviewText = '';
    this.googleUser = null;
  }

  initializeGoogleSignIn() {
    if (!window.google) return;
    
    // NOTA: Para un entorno de producción, reemplaza este ID con tu Client ID real de Google Cloud
    window.google.accounts.id.initialize({
      client_id: '1038927173267-ciusai9svcoosep45rsqflinpokfao85.apps.googleusercontent.com', 
      callback: this.handleCredentialResponse.bind(this)
    });
    
    window.google.accounts.id.renderButton(
      document.getElementById('google-btn-container'),
      { theme: 'filled_black', size: 'large', text: 'continue_with', shape: 'pill', width: 250 }
    );
  }

  handleCredentialResponse(response: any) {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      this.googleUser = JSON.parse(jsonPayload);
      this.cdr.detectChanges(); 
    } catch (e) {
      console.error('Error procesando el login de Google', e);
    }
  }
  
  simulateGoogleLogin() {
    this.googleUser = {
      name: 'Usuario de Prueba',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLtE5N5u42Zg2BwzCg9C0G6H4D7Vw1Y1Q_A3g=s96-c'
    };
    this.cdr.detectChanges();
  }

  setHoverStar(star: number) {
    this.hoveredStar = star;
  }

  setStar(star: number) {
    this.selectedStar = star;
  }

  sendReview() {
    if (!this.googleUser || this.selectedStar === 0 || !this.reviewText.trim()) return;
    
    const message = `Hola Elixir Gym! Soy ${this.googleUser.name}.\nQuiero dejar esta reseña:\n\nCalificación: ${this.selectedStar} Estrellas ⭐\nComentario: "${this.reviewText}"`;
    const whatsappUrl = `https://wa.me/56991832903?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    this.closeReviewModal();
  }
}
