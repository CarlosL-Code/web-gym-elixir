import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StatsService, Stat } from '../../services/stats.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html'
})
export class Stats implements OnInit, AfterViewInit {
  stats: Stat[] = [];
  animatedValues: { [id: string]: number } = {};
  private statsService = inject(StatsService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  
  @ViewChild('statsSection') statsSection!: ElementRef;
  private hasAnimated = false;

  ngOnInit() {
    this.stats = this.statsService.getStats();
    this.stats.forEach(s => this.animatedValues[s.id] = 0);
  }
  
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !this.hasAnimated) {
          this.animateStats();
          this.hasAnimated = true;
          observer.disconnect();
        }
      }, { threshold: 0.5 });
      
      if (this.statsSection) {
        observer.observe(this.statsSection.nativeElement);
      }
    }
  }
  
  animateStats() {
    this.stats.forEach(stat => {
      const duration = 2000;
      const steps = 60;
      const stepValue = stat.value / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        this.animatedValues[stat.id] = Math.min(Math.round(stepValue * currentStep), stat.value);
        this.cdr.detectChanges();
        if (currentStep >= steps) {
          clearInterval(interval);
          this.animatedValues[stat.id] = stat.value;
        }
      }, duration / steps);
    });
  }
}
