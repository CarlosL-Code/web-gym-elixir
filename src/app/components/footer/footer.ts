import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html'
})
export class Footer {
  currentYear = new Date().getFullYear();
  isLegalModalOpen = false;
  legalContentType: 'privacy' | 'terms' = 'privacy';

  openLegalModal(type: 'privacy' | 'terms', event: Event) {
    event.preventDefault();
    this.legalContentType = type;
    this.isLegalModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLegalModal() {
    this.isLegalModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
