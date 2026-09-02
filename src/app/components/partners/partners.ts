import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersService } from '../../services/partners.service';
import { LogoLoop, LogoLoopItem } from '../logo-loop/logo-loop';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, LogoLoop],
  templateUrl: './partners.html',
  styleUrl: './partners.css'
})
export class Partners implements OnInit {
  logos: LogoLoopItem[] = [];
  private partnersService = inject(PartnersService);

  ngOnInit() {
    this.logos = this.partnersService.getPartners().map(partner => ({
      id: partner.id,
      alt: partner.name,
      src: partner.logoUrl,
    }));
  }
}
