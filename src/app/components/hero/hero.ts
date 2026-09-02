import { Component } from '@angular/core';
import { MaskedHeadingComponent } from '../ui/masked-heading/masked-heading';

@Component({
  selector: 'app-hero',
  imports: [MaskedHeadingComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
