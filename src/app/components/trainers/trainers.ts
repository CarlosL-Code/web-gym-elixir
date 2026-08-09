import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainersService, Trainer } from '../../services/trainers.service';

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
  
  activeImageIndices: { [id: string]: number } = {};
  private slideInterval: any;
  
  private trainersService = inject(TrainersService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.trainers = this.trainersService.getTrainers();
    this.trainers.forEach(t => this.activeImageIndices[t.id] = 0);
    
    this.slideInterval = setInterval(() => {
      let changed = false;
      this.trainers.forEach(t => {
        if (t.images && t.images.length > 1) {
          this.activeImageIndices[t.id] = (this.activeImageIndices[t.id] + 1) % t.images.length;
          changed = true;
        }
      });
      if (changed) {
        this.cdr.detectChanges();
      }
    }, 3500); // 3.5 segundos por slide
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  openModal(trainer: Trainer) {
    this.selectedTrainer = trainer;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    setTimeout(() => {
      this.selectedTrainer = null;
    }, 300); // wait for animation
  }
}
