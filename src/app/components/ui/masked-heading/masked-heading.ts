import { Component, ElementRef, Input, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, NgZone, HostBinding, HostListener } from '@angular/core';
import { gsap } from 'gsap';

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

@Component({
  selector: 'app-masked-heading',
  standalone: true,
  templateUrl: './masked-heading.html',
  styleUrls: ['./masked-heading.css']
})
export class MaskedHeadingComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() text = 'Designed in the details';
  @Input() tag = 'h2';
  @Input() mediaType: 'image' | 'video' = 'image';
  @Input() src = '';
  @Input() poster = '';
  @Input() fillScale = 1.25;
  @Input() parallax = 26;
  @Input() drift = 18;
  @Input() brightness = 1;
  @Input() saturation = 1;
  @Input() grayscale = false;
  @Input() reveal: 'rise' | 'wipe' | 'fade' | 'none' = 'rise';
  @Input() duration = 1.1;
  @Input() stagger = 0.09;
  @Input() trigger: 'view' | 'hover' = 'view';
  @Input() align: 'left' | 'center' | 'right' = 'center';
  @Input() weight = 700;
  @Input() tracking = -0.03;
  @Input() lineHeight = 1.06;
  @Input() textScale = 0.115;
  @Input() customClass = '';

  @ViewChild('measureRef') measureRef!: ElementRef<HTMLElement>;
  @ViewChild('revealRef') revealRef!: ElementRef<HTMLElement>;
  @ViewChild('mediaRef') mediaRef!: ElementRef<HTMLElement>;
  
  @ViewChildren('wordRef') wordRefs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('baseRef') baseRefs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('glyphRef') glyphRefs!: QueryList<ElementRef<SVGTextElement>>;

  words: string[] = [];
  clipId: string = `mh-${Math.random().toString(36).substring(2, 9)}`;

  private tween: any = null;
  private offset = { x: 0, y: 0, tx: 0, ty: 0 };
  private raf = 0;
  private last = performance.now();
  private clock = 0;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private hasPlayed = false;

  @HostBinding('class') get hostClass() {
    return `masked-heading ${this.customClass}`.trim();
  }

  @HostBinding('style.textAlign') get hostAlign() { return this.align; }
  @HostBinding('style.fontWeight') get hostWeight() { return this.weight; }
  @HostBinding('style.letterSpacing') get hostTracking() { return `${this.tracking}em`; }
  @HostBinding('style.lineHeight') get hostLineHeight() { return this.lineHeight; }

  constructor(private el: ElementRef, private ngZone: NgZone) {
    this.updateWords();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) {
      this.updateWords();
      setTimeout(() => this.sync(), 0);
    }
    if (changes['align'] || changes['weight'] || changes['tracking'] || changes['lineHeight'] || changes['textScale']) {
      setTimeout(() => this.sync(), 0);
    }
  }

  private updateWords() {
    this.words = String(this.text).split(/\\s+/).filter(Boolean);
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    this.sync();
    
    this.resizeObserver = new ResizeObserver(() => this.sync());
    this.resizeObserver.observe(this.el.nativeElement);
    
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => this.sync()).catch(() => {});
    }

    this.ngZone.runOutsideAngular(() => {
      this.raf = requestAnimationFrame(this.frame);
    });

    this.setupAnimation();
  }

  @HostListener('pointermove', ['$event'])
  onMove(e: PointerEvent) {
    if (this.parallax <= 0) return;
    const r = this.el.nativeElement.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
    const ny = ((e.clientY - r.top) / (r.height || 1)) * 2 - 1;
    this.offset.tx = clamp(nx, -1, 1) * -this.parallax;
    this.offset.ty = clamp(ny, -1, 1) * -this.parallax;
  }

  @HostListener('pointerleave')
  onLeave() {
    this.offset.tx = 0;
    this.offset.ty = 0;
  }

  private frame = (now: number) => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.clock += dt;

    const dx = Math.sin(this.clock * 0.21) * this.drift;
    const dy = Math.cos(this.clock * 0.17) * this.drift * 0.6;

    const ease = 1 - Math.exp(-dt / 0.18);
    this.offset.x += (this.offset.tx + dx - this.offset.x) * ease;
    this.offset.y += (this.offset.ty + dy - this.offset.y) * ease;

    this.place();
    this.raf = requestAnimationFrame(this.frame);
  };

  private place() {
    const root = this.el.nativeElement;
    const media = this.mediaRef?.nativeElement;
    if (!root || !media) return;
    
    const W = root.clientWidth;
    const H = root.clientHeight;
    
    const maxX = Math.max(0, ((this.fillScale - 1) / 2) * W);
    const maxY = Math.max(0, ((this.fillScale - 1) / 2) * H);

    media.style.transform = `translate3d(${clamp(this.offset.x, -maxX, maxX).toFixed(2)}px, ${clamp(this.offset.y, -maxY, maxY).toFixed(2)}px, 0) scale(${this.fillScale})`;
    media.style.filter = `brightness(${this.brightness}) saturate(${this.saturation})${this.grayscale ? ' grayscale(1)' : ''}`;
  }

  private sync() {
    const root = this.el.nativeElement;
    const measure = this.measureRef?.nativeElement;
    if (!root || !measure) return;

    root.style.fontSize = `${clamp(root.clientWidth * this.textScale, 20, 200).toFixed(1)}px`;

    const cs = window.getComputedStyle(measure);
    const wordsArr = this.wordRefs.toArray();
    const baseArr = this.baseRefs.toArray();
    const glyphArr = this.glyphRefs.toArray();

    for (let i = 0; i < wordsArr.length; i++) {
      const box = wordsArr[i].nativeElement;
      const base = baseArr[i].nativeElement;
      const glyph = glyphArr[i].nativeElement;
      
      if (!box || !base || !glyph) continue;
      
      glyph.setAttribute('x', `${box.offsetLeft}`);
      glyph.setAttribute('y', `${base.offsetTop}`);
      glyph.style.fontFamily = cs.fontFamily;
      glyph.style.fontSize = cs.fontSize;
      glyph.style.fontWeight = cs.fontWeight;
      glyph.style.fontStyle = cs.fontStyle;
      glyph.style.letterSpacing = cs.letterSpacing;
    }
    this.place();
  }

  private setupAnimation() {
    const root = this.el.nativeElement;
    const layer = this.revealRef?.nativeElement;
    const glyphs = this.glyphRefs?.toArray().map(r => r.nativeElement).filter(Boolean);
    
    if (!root || !layer || !glyphs || !glyphs.length) return;

    const riseDistance = () => (parseFloat(window.getComputedStyle(root).fontSize) || 48) * 1.15;

    const settle = () => {
      gsap.set(glyphs, { y: 0 });
      gsap.set(layer, { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' });
    };

    const rest = () => {
      if (this.reveal === 'rise') {
        gsap.set(glyphs, { y: riseDistance() });
      } else if (this.reveal === 'wipe') {
        gsap.set(layer, { clipPath: 'inset(0% 100% 0% 0%)' });
      } else if (this.reveal === 'fade') {
        gsap.set(layer, { opacity: 0, scale: 1.08 });
      }
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reveal === 'none' || reduce) {
      settle();
      return;
    }

    const play = () => {
      this.tween?.kill();
      if (this.reveal === 'rise') {
        gsap.set(layer, { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' });
        this.tween = gsap.fromTo(
          glyphs,
          { y: riseDistance() },
          { y: 0, duration: this.duration, stagger: this.stagger, ease: 'power4.out', overwrite: 'auto' }
        );
      } else if (this.reveal === 'wipe') {
        gsap.set(glyphs, { y: 0 });
        const state = { p: 100 };
        this.tween = gsap.to(state, {
          p: 0,
          duration: this.duration,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onUpdate: () => {
            layer.style.clipPath = `inset(0% ${state.p}% 0% 0%)`;
          }
        });
      } else {
        gsap.set(glyphs, { y: 0 });
        this.tween = gsap.fromTo(
          layer,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: this.duration, ease: 'power3.out', overwrite: 'auto' }
        );
      }
    };

    if (this.trigger === 'hover') {
      settle();
      root.addEventListener('pointerenter', play);
    } else if (this.trigger === 'view') {
      settle();
      rest();
      this.intersectionObserver = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting) && !this.hasPlayed) {
          play();
          this.hasPlayed = true;
          this.intersectionObserver?.disconnect();
        }
      }, { threshold: 0.25 });
      this.intersectionObserver.observe(root);
    } else {
      play();
    }
  }

  ngOnDestroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.tween?.kill();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
  }
}
