import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
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
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const hasSeenPromo = localStorage.getItem('hasSeenPromo_Elixir');
      
      if (!hasSeenPromo) {
        setTimeout(() => {
          this.isVisible = true;
          document.body.style.overflow = 'hidden';
          this.cdr.detectChanges(); // Force view update
        }, 4000);
      }
    }
  }

  closeModal() {
    this.isVisible = false;
    document.body.style.overflow = ''; // Use empty string to restore original
    this.cdr.detectChanges();
    if (this.isBrowser) {
      localStorage.setItem('hasSeenPromo_Elixir', 'true');
    }
  }
}
