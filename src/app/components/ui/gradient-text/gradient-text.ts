import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gradient-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animated-gradient-text {{className}}"
         [class.with-border]="showBorder"
         (mouseenter)="onMouseEnter()"
         (mouseleave)="onMouseLeave()">
      
      <div *ngIf="showBorder" class="gradient-overlay" 
           [style.backgroundImage]="gradientStyle" 
           [style.backgroundSize]="bgSize"
           [style.animationDuration]="animationSpeed + 's'"
           [style.animationDirection]="yoyo ? 'alternate' : 'normal'"
           [class.paused]="isPaused"></div>
           
      <div class="text-content" 
           [style.backgroundImage]="gradientStyle" 
           [style.backgroundSize]="bgSize"
           [style.animationDuration]="animationSpeed + 's'"
           [style.animationDirection]="yoyo ? 'alternate' : 'normal'"
           [class.paused]="isPaused">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    @keyframes gradient-text-anim {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    
    @keyframes gradient-text-anim-vertical {
      0% { background-position: 50% 0%; }
      100% { background-position: 50% 100%; }
    }

    .animated-gradient-text {
      position: relative;
      margin: 0 auto;
      display: flex;
      max-width: fit-content;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 1.25rem;
      font-weight: 500;
      backdrop-filter: blur(10px);
      transition: box-shadow 0.5s ease-out;
      overflow: hidden;
      cursor: pointer;
    }

    .animated-gradient-text.with-border {
      padding: 0.35rem 0.75rem;
    }

    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      z-index: 0;
      pointer-events: none;
      animation: gradient-text-anim 8s linear infinite;
    }
    .gradient-overlay.paused {
      animation-play-state: paused;
    }

    .gradient-overlay::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border-radius: inherit;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #120F17;
      z-index: -1;
    }

    .text-content {
      display: inline-block;
      position: relative;
      z-index: 2;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: gradient-text-anim 8s linear infinite;
    }
    .text-content.paused {
      animation-play-state: paused;
    }
  `]
})
export class GradientTextComponent implements OnInit {
  @Input() className = '';
  @Input() colors = ['#5227FF', '#FF9FFC', '#B497CF'];
  @Input() animationSpeed = 8;
  @Input() showBorder = false;
  @Input() direction: 'horizontal' | 'vertical' | 'diagonal' = 'horizontal';
  @Input() pauseOnHover = false;
  @Input() yoyo = true;

  isPaused = false;
  gradientStyle = '';
  bgSize = '';

  ngOnInit() {
    const gradientAngle = this.direction === 'horizontal' ? 'to right' : this.direction === 'vertical' ? 'to bottom' : 'to bottom right';
    const gradientColors = [...this.colors, this.colors[0]].join(', ');
    
    this.gradientStyle = `linear-gradient(${gradientAngle}, ${gradientColors})`;
    this.bgSize = this.direction === 'horizontal' ? '300% 100%' : this.direction === 'vertical' ? '100% 300%' : '300% 300%';
  }

  onMouseEnter() {
    if (this.pauseOnHover) this.isPaused = true;
  }

  onMouseLeave() {
    if (this.pauseOnHover) this.isPaused = false;
  }
}
