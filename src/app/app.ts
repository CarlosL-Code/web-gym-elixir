import { Component, HostListener, AfterViewInit } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Benefits } from './components/benefits/benefits';
import { Plans } from './components/plans/plans';
import { Classes } from './components/classes/classes';
import { Trainers } from './components/trainers/trainers';
import { Gallery } from './components/gallery/gallery';
import { Stats } from './components/stats/stats';
import { Partners } from './components/partners/partners';
import { Testimonials } from './components/testimonials/testimonials';
import { Faq } from './components/faq/faq';
import { Contact } from './components/contact/contact';
import { Location } from './components/location/location';
import { FinalCta } from './components/final-cta/final-cta';
import { Footer } from './components/footer/footer';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';
import { VideoShowcase } from './components/video-showcase/video-showcase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar, Hero, VideoShowcase, Benefits, Plans, Classes, Trainers, Gallery, Stats, Partners, Testimonials, Faq, Contact, Location, FinalCta, Footer, WhatsappButton
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
  private isVisible = false;
  private hasMoved = false;

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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    
    if (!this.hasMoved) {
      this.hasMoved = true;
      this.ringX = this.mouseX;
      this.ringY = this.mouseY;
      for (let i = 0; i < this.numDots; i++) {
        this.dotsPos[i] = { x: this.mouseX, y: this.mouseY };
      }
    }
    this.isVisible = true;
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.isVisible = false;
  }

  @HostListener('document:mouseenter')
  onMouseEnter() {
    this.isVisible = true;
  }

  private animate = () => {
    // Lerp ring
    this.ringX += (this.mouseX - this.ringX) * 0.4;
    this.ringY += (this.mouseY - this.ringY) * 0.4;

    const ring = document.getElementById('custom-cursor-ring');
    const dot = document.getElementById('custom-cursor-dot');
    
    if (dot) {
      dot.style.opacity = this.isVisible ? '1' : '0';
      if (this.isVisible) dot.style.transform = `translate3d(calc(${this.mouseX}px - 50%), calc(${this.mouseY}px - 50%), 0)`;
    }
    if (ring) {
      ring.style.opacity = this.isVisible ? '1' : '0';
      if (this.isVisible) ring.style.transform = `translate3d(calc(${this.ringX}px - 50%), calc(${this.ringY}px - 50%), 0)`;
    }

    // Calculate trail positions
    let leadX = this.mouseX;
    let leadY = this.mouseY;

    for (let i = 0; i < this.numDots; i++) {
      const point = this.dotsPos[i];
      // Lerp towards the previous point, lower factor for wider spacing
      point.x += (leadX - point.x) * 0.4;
      point.y += (leadY - point.y) * 0.4;

      if (this.dots[i]) {
        this.dots[i].style.opacity = this.isVisible ? `${1 - i / this.numDots}` : '0';
        if (this.isVisible) {
          this.dots[i].style.transform = `translate3d(calc(${point.x}px - 50%), calc(${point.y}px - 50%), 0) scale(${1 - i / this.numDots})`;
        }
      }

      leadX = point.x;
      leadY = point.y;
    }

    requestAnimationFrame(this.animate);
  }
}
