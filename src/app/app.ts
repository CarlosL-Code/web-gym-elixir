import { Component, HostListener, AfterViewInit } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, Navbar, Footer, WhatsappButton
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  title = 'web-gym';

  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private dots: HTMLElement[] = [];
  private dotsPos: {x: number, y: number}[] = [];
  private readonly numDots = 10;

  ngAfterViewInit() {
    // Check if we are in the browser to avoid SSR errors
    if (typeof document !== 'undefined') {
      const container = document.getElementById('cursor-trail-container');
      if (container) {
        for (let i = 0; i < this.numDots; i++) {
          const dot = document.createElement('div');
          dot.className = 'custom-cursor-trail-dot';
          container.appendChild(dot);
          this.dots.push(dot);
          this.dotsPos.push({x: 0, y: 0});
        }
      }
      this.animate();
    }
  }

  isVisible = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (!this.isVisible) this.isVisible = true;
  }

  @HostListener('document:mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent) {
    this.isVisible = false;
  }

  @HostListener('document:mouseenter', ['$event'])
  onMouseEnter(e: MouseEvent) {
    this.isVisible = true;
  }

  isHovering = false;

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const clickable = target.closest('a, button, [routerLink], input, select, textarea');
    this.isHovering = !!clickable;
  }

  private ringScale = 1;
  private dotScale = 1;

  private animate = () => {
    // Lerp ring
    this.ringX += (this.mouseX - this.ringX) * 0.2;
    this.ringY += (this.mouseY - this.ringY) * 0.2;

    const ring = document.getElementById('custom-cursor-ring');
    const dot = document.getElementById('custom-cursor-dot');
    
    const targetScale = this.isHovering ? 1.5 : 1;
    const targetDotScale = this.isHovering ? 0 : 1;
    
    this.ringScale += (targetScale - this.ringScale) * 0.2;
    this.dotScale += (targetDotScale - this.dotScale) * 0.2;
    
    const opacity = this.isVisible ? 1 : 0;
    
    if (dot) {
      dot.style.transform = `translate3d(calc(${this.mouseX}px - 50%), calc(${this.mouseY}px - 50%), 0) scale(${this.dotScale})`;
      dot.style.opacity = `${opacity}`;
    }
    if (ring) {
      ring.style.transform = `translate3d(calc(${this.ringX}px - 50%), calc(${this.ringY}px - 50%), 0) scale(${this.ringScale})`;
      ring.style.opacity = `${opacity}`;
      if (this.isHovering) {
        ring.classList.add('cursor-hovered');
      } else {
        ring.classList.remove('cursor-hovered');
      }
    }

    // Calculate trail positions
    let leadX = this.mouseX;
    let leadY = this.mouseY;

    for (let i = 0; i < this.numDots; i++) {
      const point = this.dotsPos[i];
      // Lerp towards the previous point, lower factor for wider spacing
      point.x += (leadX - point.x) * 0.25;
      point.y += (leadY - point.y) * 0.25;

      if (this.dots[i]) {
        this.dots[i].style.transform = `translate3d(calc(${point.x}px - 50%), calc(${point.y}px - 50%), 0) scale(${1 - i / this.numDots})`;
        // Trail opacity fades out anyway, but if not visible, hide completely
        this.dots[i].style.opacity = this.isVisible ? `${1 - i / this.numDots}` : '0';
      }

      leadX = point.x;
      leadY = point.y;
    }

    requestAnimationFrame(this.animate);
  }
}
