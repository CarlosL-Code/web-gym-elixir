import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TrainersService, Trainer, TrainerCertification } from '../../services/trainers.service';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainers.html'
})
export class Trainers implements OnInit, OnDestroy {
  trainers: Trainer[] = [];
  selectedTrainer: Trainer | null = null;
  isModalOpen = false;
  hoveredTrainerId: string | null = null;

  // Certification viewer state
  selectedCert: TrainerCertification | null = null;
  isCertModalOpen = false;

  activeImageIndices: { [id: string]: number } = {};
  private slideInterval: any;

  private trainersService = inject(TrainersService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.isCertModalOpen) {
      this.closeCertModal();
    } else if (this.isModalOpen) {
      this.closeModal();
    }
  }

  ngOnInit() {
    this.trainers = this.trainersService.getTrainers();
    this.trainers.forEach(t => this.activeImageIndices[t.id] = 0);

    if (isPlatformBrowser(this.platformId)) {
      this.slideInterval = setInterval(() => {
        let changed = false;
        this.trainers.forEach(t => {
          if (t.images && t.images.length > 1 && this.hoveredTrainerId !== t.id) {
            this.activeImageIndices[t.id] = (this.activeImageIndices[t.id] + 1) % t.images.length;
            changed = true;
          }
        });
        if (changed) this.cdr.detectChanges();
      }, 6000);
    }
  }

  ngOnDestroy() {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  openModal(trainer: Trainer) {
    this.selectedTrainer = trainer;
    this.isModalOpen = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.isCertModalOpen = false;
    this.selectedCert = null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
    setTimeout(() => { this.selectedTrainer = null; }, 300);
  }

  openCertModal(cert: TrainerCertification, event: Event) {
    event.stopPropagation();
    this.selectedCert = cert;
    this.isCertModalOpen = true;
  }

  closeCertModal() {
    this.isCertModalOpen = false;
    setTimeout(() => { this.selectedCert = null; }, 300);
  }

  getWhatsappMessage(trainer: Trainer | null): string {
    if (!trainer) return '';
    const msg = `Hola ${trainer.name}! Vi tu perfil en la web de Elixir Gym y me gustaría consultar sobre un entrenamiento personalizado de ${trainer.specialty}. ¿Cuándo podríamos coordinar?`;
    return encodeURIComponent(msg);
  }
}
