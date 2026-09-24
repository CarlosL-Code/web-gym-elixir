import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-modal.html'
})
export class PromoModal implements OnInit {
  isVisible = false;
  isBrowser = false;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const hasSeenPromo = localStorage.getItem('hasSeenPromo_Elixir');
      
      if (!hasSeenPromo) {
        // Show after 4 seconds
        setTimeout(() => {
          this.isVisible = true;
          document.body.style.overflow = 'hidden';
        }, 4000);
      }
    }
  }

  closeModal() {
    this.isVisible = false;
    document.body.style.overflow = 'auto';
    if (this.isBrowser) {
      localStorage.setItem('hasSeenPromo_Elixir', 'true');
    }
  }
}
