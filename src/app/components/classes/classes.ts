import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesService, GymClass } from '../../services/classes.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classes.html'
})
export class Classes implements OnInit {
  classes: GymClass[] = [];
  private classesService = inject(ClassesService);

  ngOnInit() {
    this.classes = this.classesService.getClasses();
  }
}
