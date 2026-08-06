import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainersService, Trainer } from '../../services/trainers.service';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainers.html'
})
export class Trainers implements OnInit {
  trainers: Trainer[] = [];
  selectedTrainer: Trainer | null = null;
  isModalOpen = false;
  
  private trainersService = inject(TrainersService);

  ngOnInit() {
    this.trainers = this.trainersService.getTrainers();
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
