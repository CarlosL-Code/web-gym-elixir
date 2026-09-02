import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersService, Partner } from '../../services/partners.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.html',
  styleUrl: './partners.css'
})
export class Partners implements OnInit {
  partners: Partner[] = [];
  loopedPartners: Partner[] = [];
  failedLogos = new Set<string>();
  private partnersService = inject(PartnersService);

  ngOnInit() {
    this.partners = this.partnersService.getPartners();
    // Duplicated for a seamless infinite marquee loop
    this.loopedPartners = [...this.partners, ...this.partners];
  }

  onLogoError(partnerId: string) {
    this.failedLogos.add(partnerId);
  }
}
