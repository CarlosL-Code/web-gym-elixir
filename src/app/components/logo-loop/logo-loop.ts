import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface LogoLoopItem {
  id: string;
  alt: string;
  src?: string;
  href?: string;
}

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

@Component({
  selector: 'app-logo-loop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-loop.html',
  styleUrl: './logo-loop.css',
})
export class LogoLoop implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) logos: LogoLoopItem[] = [];
  @Input() speed = 80;
  @Input() direction: 'left' | 'right' = 'left';
  @Input() gap = 32;
  @Input() logoHeight = 96;
  @Input() pauseOnHover = true;
  @Input() fadeOut = true;
  @Input() fadeColor = '#0e0e0e';
  @Input() ariaLabel = 'Logos';

  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;

  copies: number[] = [0, 1];
  isHovered = false;
  failedIds = new Set<string>();

  private platformId = inject(PLATFORM_ID);
  private resizeObserver?: ResizeObserver;
  private rafId: number | null = null;
  private lastTimestamp: number | null = null;
  private offset = 0;
  private velocity = 0;
  private seqWidth = 0;
  private started = false;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.setupResizeObserver();
    this.startAnimation();
    this.started = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['logos'] && this.started) {
      // Let the new sequence render before re-measuring
      queueMicrotask(() => this.updateDimensions());
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  onImageError(id: string) {
    this.failedIds.add(id);
    this.updateDimensions();
  }

  onImageLoad() {
    this.updateDimensions();
  }

  onMouseEnter() {
    if (this.pauseOnHover) this.isHovered = true;
  }

  onMouseLeave() {
    if (this.pauseOnHover) this.isHovered = false;
  }

  trackByIndex(index: number) {
    return index;
  }

  private updateDimensions = () => {
    const containerWidth = this.containerRef?.nativeElement.clientWidth ?? 0;
    const firstList = this.containerRef?.nativeElement.querySelector('.logoloop__list') as HTMLElement | null;
    const sequenceWidth = firstList?.getBoundingClientRect().width ?? 0;

    if (sequenceWidth > 0) {
      this.seqWidth = Math.ceil(sequenceWidth);
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM;
      const count = Math.max(MIN_COPIES, copiesNeeded);
      if (count !== this.copies.length) {
        this.copies = Array.from({ length: count }, (_, i) => i);
      }
    }
  };

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
      return;
    }
    this.resizeObserver = new ResizeObserver(() => this.updateDimensions());
    if (this.containerRef?.nativeElement) {
      this.resizeObserver.observe(this.containerRef.nativeElement);
    }
    this.updateDimensions();
  }

  private startAnimation() {
    const directionMultiplier = this.direction === 'left' ? 1 : -1;
    const targetVelocity = Math.abs(this.speed) * directionMultiplier;

    const animate = (timestamp: number) => {
      if (this.lastTimestamp === null) this.lastTimestamp = timestamp;
      const deltaTime = Math.max(0, timestamp - this.lastTimestamp) / 1000;
      this.lastTimestamp = timestamp;

      const target = this.isHovered ? 0 : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
      this.velocity += (target - this.velocity) * easingFactor;

      if (this.seqWidth > 0) {
        let nextOffset = this.offset + this.velocity * deltaTime;
        nextOffset = ((nextOffset % this.seqWidth) + this.seqWidth) % this.seqWidth;
        this.offset = nextOffset;

        if (this.trackRef?.nativeElement) {
          this.trackRef.nativeElement.style.transform = `translate3d(${-this.offset}px, 0, 0)`;
        }
      }

      this.rafId = requestAnimationFrame(animate);
    };

    this.rafId = requestAnimationFrame(animate);
  }
}
