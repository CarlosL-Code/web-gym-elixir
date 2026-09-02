import { Component } from '@angular/core';
import { GradientTextComponent } from '../ui/gradient-text/gradient-text';

@Component({
  selector: 'app-hero',
  imports: [GradientTextComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
