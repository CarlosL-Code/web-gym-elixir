import { Component, ElementRef, Input, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, NgZone, HostListener } from '@angular/core';

const TWO_PI = Math.PI * 2;

@Component({
  selector: 'app-dot-field',
  standalone: true,
  template: `
    <div class="dot-field-container relative w-full h-full" [class]="customClass">
      <canvas #canvasRef style="position: absolute; inset: 0; width: 100%; height: 100%;"></canvas>
      <svg #svgRef style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
        <defs>
          <radialGradient [attr.id]="glowId">
            <stop offset="0%" [attr.stop-color]="glowColor" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
        </defs>
        <circle #glowRef cx="-9999" cy="-9999" [attr.r]="glowRadius" [attr.fill]="'url(#' + glowId + ')'" style="opacity: 0; will-change: opacity;" />
      </svg>
    </div>
  `,
  styles: [`
    :host { display: block; position: absolute; inset: 0; width: 100%; height: 100%; }
    .dot-field-container { position: relative; width: 100%; height: 100%; }
  `]
})
export class DotFieldComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() dotRadius = 1.5;
  @Input() dotSpacing = 14;
  @Input() cursorRadius = 500;
  @Input() cursorForce = 0.1;
  @Input() bulgeOnly = true;
  @Input() bulgeStrength = 67;
  @Input() glowRadius = 160;
  @Input() sparkle = false;
  @Input() waveAmplitude = 0;
  @Input() gradientFrom = 'rgba(168, 85, 247, 0.35)';
  @Input() gradientTo = 'rgba(180, 151, 207, 0.25)';
  @Input() glowColor = '#120F17';
  @Input() customClass = '';

  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('glowRef') glowRef!: ElementRef<SVGCircleElement>;

  glowId = `dot-field-glow-${Math.random().toString(36).slice(2, 9)}`;

  private dots: any[] = [];
  private mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
  private raf: any;
  private size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
  private glowOpacity = 0;
  private engagement = 0;
  private resizeTimer: any;
  private speedInterval: any;
  private frameCount = 0;
  private ctx!: CanvasRenderingContext2D | null;

  constructor(private ngZone: NgZone) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dotRadius'] || changes['dotSpacing']) {
      this.rebuildDots();
    }
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true });
    
    if (typeof window !== 'undefined') {
      this.doResize();
      window.addEventListener('resize', this.onResize);
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      
      this.ngZone.runOutsideAngular(() => {
        this.speedInterval = setInterval(() => this.updateMouseSpeed(), 20);
        this.tick();
      });
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      cancelAnimationFrame(this.raf);
      clearInterval(this.speedInterval);
      clearTimeout(this.resizeTimer);
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  private onResize = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.doResize(), 100);
  };

  private doResize() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (!parent || !this.ctx) return;

    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.size = {
      w,
      h,
      offsetX: rect.left + window.scrollX,
      offsetY: rect.top + window.scrollY,
    };

    this.buildDots(w, h);
  }

  private buildDots(w: number, h: number) {
    const step = this.dotRadius + this.dotSpacing;
    const cols = Math.floor(w / step);
    const rows = Math.floor(h / step);
    const padX = (w % step) / 2;
    const padY = (h % step) / 2;
    const dots = new Array(rows * cols);
    let idx = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
      }
    }
    this.dots = dots;
  }

  private rebuildDots() {
    if (this.size.w > 0 && this.size.h > 0) {
      this.buildDots(this.size.w, this.size.h);
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.pageX - this.size.offsetX;
    this.mouse.y = e.pageY - this.size.offsetY;
  };

  private updateMouseSpeed() {
    const m = this.mouse;
    const dx = m.prevX - m.x;
    const dy = m.prevY - m.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    m.speed += (dist - m.speed) * 0.5;
    if (m.speed < 0.001) m.speed = 0;
    m.prevX = m.x;
    m.prevY = m.y;
  }

  private tick = () => {
    this.frameCount++;
    const { w, h } = this.size;
    const m = this.mouse;
    const ctx = this.ctx;
    const glowEl = this.glowRef?.nativeElement;
    const len = this.dots.length;
    const t = this.frameCount * 0.02;

    if (!ctx) return;

    const targetEngagement = Math.min(m.speed / 5, 1);
    this.engagement += (targetEngagement - this.engagement) * 0.06;
    if (this.engagement < 0.001) this.engagement = 0;
    const eng = this.engagement;

    this.glowOpacity += (eng - this.glowOpacity) * 0.08;

    if (glowEl) {
      glowEl.setAttribute('cx', String(m.x));
      glowEl.setAttribute('cy', String(m.y));
      glowEl.style.opacity = String(this.glowOpacity);
    }

    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, this.gradientFrom);
    grad.addColorStop(1, this.gradientTo);
    ctx.fillStyle = grad;

    const crSq = this.cursorRadius * this.cursorRadius;
    const rad = this.dotRadius / 2;
    const isBulge = this.bulgeOnly;

    ctx.beginPath();

    for (let i = 0; i < len; i++) {
      const d = this.dots[i];
      const dx = m.x - d.ax;
      const dy = m.y - d.ay;
      const distSq = dx * dx + dy * dy;

      if (distSq < crSq && eng > 0.01) {
        const dist = Math.sqrt(distSq);
        if (isBulge) {
          const t_val = 1 - dist / this.cursorRadius;
          const push = t_val * t_val * this.bulgeStrength * eng;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          const angle = Math.atan2(dy, dx);
          const move = (500 / dist) * (m.speed * this.cursorForce);
          d.vx += Math.cos(angle) * -move;
          d.vy += Math.sin(angle) * -move;
        }
      } else if (isBulge) {
        d.sx += (d.ax - d.sx) * 0.1;
        d.sy += (d.ay - d.sy) * 0.1;
      }

      if (!isBulge) {
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.x = d.ax + d.vx;
        d.y = d.ay + d.vy;
        d.sx += (d.x - d.sx) * 0.1;
        d.sy += (d.y - d.sy) * 0.1;
      }

      let drawX = d.sx;
      let drawY = d.sy;
      
      if (this.waveAmplitude > 0) {
        drawY += Math.sin(d.ax * 0.03 + t) * this.waveAmplitude;
        drawX += Math.cos(d.ay * 0.03 + t * 0.7) * this.waveAmplitude * 0.5;
      }

      if (this.sparkle) {
        const hash = ((i * 2654435761) ^ (this.frameCount >> 3)) >>> 0;
        if ((hash % 100) < 3) {
          ctx.moveTo(drawX + rad * 1.8, drawY);
          ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      } else {
        ctx.moveTo(drawX + rad, drawY);
        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
      }
    }

    ctx.fill();

    this.raf = requestAnimationFrame(this.tick);
  };
}
