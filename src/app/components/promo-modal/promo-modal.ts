import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-modal.html'
})
export class PromoModal implements OnInit {
  isModalOpen = false;
  isMiniFloating = false;
  isBrowser = false;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.isModalOpen = true;
        document.body.style.overflow = 'hidden';
        this.cdr.detectChanges(); // Force view update
      }, 4000);
    }
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = ''; // Restore original overflow
    this.isMiniFloating = true; // Activar widget flotante
    this.cdr.detectChanges();
  }

  reopenModal() {
    this.isMiniFloating = false;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }
}
