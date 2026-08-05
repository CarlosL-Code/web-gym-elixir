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
  private trainersService = inject(TrainersService);

  ngOnInit() {
    this.trainers = this.trainersService.getTrainers();
  }
}
