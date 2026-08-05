import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqService, FAQ } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html'
})
export class Faq implements OnInit {
  faqs: FAQ[] = [];
  openIndex: number | null = null;
  private faqService = inject(FaqService);

  ngOnInit() {
    this.faqs = this.faqService.getFaqs();
  }
  
  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
