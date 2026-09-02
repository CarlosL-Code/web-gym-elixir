import { Component, ElementRef, Input, OnDestroy, AfterViewInit, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

/**
 * Convierte un código hexadecimal de color a RGB normalizado (0.0 a 1.0).
 */
const hexToRgb = (hex: string) => {
  const value = hex.trim().replace(/^#/, '');
  const normalized = value.length === 3 ? value.replace(/./g, channel => channel + channel) : value;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!match) return [1, 1, 1];
  return [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255];
};

/**
 * Asigna un color hexadecimal a una variable uniform de WebGL.
 */
const setColor = (uniform: any, hex: string) => {
  const color = hexToRgb(hex);
  uniform.value[0] = color[0];
  uniform.value[1] = color[1];
  uniform.value[2] = color[2];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uLayers;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uWaveSpeed;
uniform float uLayerSpeed;
uniform float uTwist;
uniform float uTwistFrequency;
uniform float uTwistSpeed;
uniform float uLineFrequency;
uniform float uLineSpacing;
uniform float uLineSharpness;
uniform float uGlowFalloff;
uniform float uGlowIntensity;
uniform float uBrightness;
uniform float uBlueBoost;
uniform float uVignette;
uniform float uGrain;
uniform float uRotationSpeed;
uniform float uLightMode;
uniform vec3 uLineColor;
uniform vec3 uGlowColor;

out vec4 fragColor;

#define MAX_LAYERS 10

mat2 rotate2d(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float grainHash(vec2 point) {
  point = floor(point);
  float hash = 52.9829189 * fract(dot(point, vec2(0.065, 0.005)));
  return fract(hash);
}

float layeredGrain(vec2 fragmentPixel) {
  vec2 point = mod(fragmentPixel + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
  vec2 rotated = mat2(0.8, -0.5, 0.5, 0.8) * point;
  float grain = 0.0;
  grain += 0.40 * grainHash(rotated);
  grain += 0.25 * grainHash(rotated * 2.0 + 17.0);
  grain += 0.20 * grainHash(rotated * 4.0 + 47.0);
  grain += 0.10 * grainHash(rotated * 8.0 + 113.0);
  grain += 0.05 * grainHash(rotated * 16.0 + 191.0);
  return grain;
}

void main() {
  vec2 resolution = max(uResolution, vec2(1.0));
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;
  float time = uTime * uSpeed;
  vec3 backdrop = mix(vec3(0.070588, 0.058824, 0.090196), vec3(1.0), step(0.5, uLightMode));
  vec3 centerTone = max(uLineColor * 0.85567 - uGlowColor * 0.06186, vec3(0.0));
  vec3 cloudTone = uLineColor * 0.19588 + uGlowColor * 0.2268;
  vec2 p = uv;
  p /= max(uScale, 0.05);
  p = rotate2d(radians(uRotation) + time * uRotationSpeed) * p;
  vec3 color = vec3(0.0);
  float fiberField = 0.0;

  for (int index = 0; index < MAX_LAYERS; index++) {
    float fi = float(index) + 1.0;
    if (fi > uLayers) break;

    p += uWaveAmplitude * sin(p.yx * fi * uWaveFrequency + time * (uWaveSpeed + fi * uLayerSpeed));

    float radius = length(p);
    float polarAngle = atan(p.y, p.x);
    polarAngle += sin(radius * uTwistFrequency - time * uTwistSpeed + fi) * uTwist;
    p = vec2(cos(polarAngle), sin(polarAngle)) * radius;

    float lines = abs(sin(p.x * (uLineFrequency + fi * uLineSpacing) + sin(p.y * 3.0 + time)));
    lines = pow(max(0.0, 1.0 - lines), uLineSharpness);
    fiberField += lines / fi;
    color += uLineColor * lines / fi;

    float glow = exp(-uGlowFalloff * abs(sin(p.x * 3.0 + time + fi)));
    color += uGlowColor * glow * uGlowIntensity / (fi * 2.0);
  }

  float center = exp(-2.2 * dot(uv, uv));
  color += centerTone * center;

  float cloud = exp(-1.5 * length(uv + vec2(sin(time * 0.3) * 0.25, cos(time * 0.25) * 0.18)));
  color += cloudTone * cloud;

  float vignette = 1.0 - smoothstep(0.35, 1.45, length(uv));
  color *= mix(1.0 - uVignette, 1.0, vignette);
  color = 1.0 - exp(-color * uBrightness);
  color.b *= uBlueBoost;

  vec3 outputColor;
  if (uLightMode > 0.5) {
    float edgeFade = mix(1.0 - uVignette, 1.0, vignette);
    float fibers = pow(smoothstep(0.12, 1.05, fiberField) * edgeFade, 1.5);
    float atmosphere = (center * 0.025 + cloud * 0.015) * edgeFade;
    vec3 fiberInk = mix(backdrop, uLineColor, 0.52);
    vec3 airColor = mix(backdrop, uGlowColor, 0.16);

    outputColor = mix(backdrop, airColor, atmosphere);
    outputColor = mix(outputColor, fiberInk, fibers * 0.3);
  } else {
    outputColor = backdrop + color;
  }

  float noise = (layeredGrain(gl_FragCoord.xy) - 0.5) * uGrain;
  outputColor = clamp(outputColor + noise, 0.0, 1.0);
  fragColor = vec4(outputColor, 1.0);
}
`;

/**
 * @Component GhostFibersComponent
 * Componente que renderiza un fondo animado de fibras usando WebGL (ogl).
 * Documentación de las variables de configuración disponibles en los @Inputs.
 */
@Component({
  selector: 'app-ghost-fibers',
  standalone: true,
  template: `<div class="ghost-fibers-container {{className}}"></div>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .ghost-fibers-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `]
})
export class GhostFibersComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() lineColor = '#140E35';
  @Input() glowColor = '#3437A0';
  @Input() speed = 0.2;
  @Input() scale = 2;
  @Input() rotation = 0;
  @Input() rotationSpeed = 0.25;
  @Input() layers = 4;
  @Input() waveAmplitude = 0.015;
  @Input() waveFrequency = 3;
  @Input() waveSpeed = 0.15;
  @Input() layerSpeed = 0.08;
  @Input() twist = 0.1;
  @Input() twistFrequency = 5;
  @Input() twistSpeed = 1.2;
  @Input() lineFrequency = 5;
  @Input() lineSpacing = 2;
  @Input() lineSharpness = 16;
  @Input() glowFalloff = 10;
  @Input() glowIntensity = 1.6;
  @Input() brightness = 2;
  @Input() blueBoost = 1.25;
  @Input() vignette = 0.8;
  @Input() grain = 0.05;
  @Input() lightMode = false;
  @Input() dpr = 1;
  @Input() fps = 60;
  @Input() paused = false;
  @Input() className = '';

  private renderer: any;
  private program: any;
  private mesh: any;
  private gl: any;
  private frameId: number = 0;
  private elapsed: number = 0;
  private previousTime: number = performance.now();
  private lastRenderTime: number = 0;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  
  private isVisible = true;
  private isPageVisible = true;
  private reducedMotion: MediaQueryList | null = null;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Evitamos ejecutar WebGL en SSR (Server Side Rendering)
    if (typeof window === 'undefined') return;

    this.isPageVisible = !document.hidden;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const container = this.el.nativeElement.querySelector('.ghost-fibers-container');
    if (!container) return;

    this.renderer = new Renderer({
      webgl: 2,
      alpha: false,
      antialias: false,
      dpr: Math.min(Math.max(this.dpr, 0.5), 2)
    });
    
    this.gl = this.renderer.gl;
    const canvas = this.gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    const geometry = new Triangle(this.gl);
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: new Float32Array([1, 1]) },
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
        uScale: { value: this.scale },
        uRotation: { value: this.rotation },
        uRotationSpeed: { value: this.rotationSpeed },
        uLayers: { value: this.layers },
        uWaveAmplitude: { value: this.waveAmplitude },
        uWaveFrequency: { value: this.waveFrequency },
        uWaveSpeed: { value: this.waveSpeed },
        uLayerSpeed: { value: this.layerSpeed },
        uTwist: { value: this.twist },
        uTwistFrequency: { value: this.twistFrequency },
        uTwistSpeed: { value: this.twistSpeed },
        uLineFrequency: { value: this.lineFrequency },
        uLineSpacing: { value: this.lineSpacing },
        uLineSharpness: { value: this.lineSharpness },
        uGlowFalloff: { value: this.glowFalloff },
        uGlowIntensity: { value: this.glowIntensity },
        uBrightness: { value: this.brightness },
        uBlueBoost: { value: this.blueBoost },
        uVignette: { value: this.vignette },
        uGrain: { value: this.grain },
        uLightMode: { value: this.lightMode ? 1 : 0 },
        uLineColor: { value: new Float32Array(hexToRgb(this.lineColor)) },
        uGlowColor: { value: new Float32Array(hexToRgb(this.glowColor)) }
      }
    });
    this.mesh = new Mesh(this.gl, { geometry, program: this.program });

    this.setupObservers(container);
    this.setSize(container);
    this.start();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.program) {
      const uniforms = this.program.uniforms;
      if (changes['lineColor']) setColor(uniforms.uLineColor, this.lineColor);
      if (changes['glowColor']) setColor(uniforms.uGlowColor, this.glowColor);
      if (changes['speed']) uniforms.uSpeed.value = this.speed;
      if (changes['scale']) uniforms.uScale.value = this.scale;
      if (changes['rotation']) uniforms.uRotation.value = this.rotation;
      if (changes['rotationSpeed']) uniforms.uRotationSpeed.value = this.rotationSpeed;
      if (changes['layers']) uniforms.uLayers.value = Math.min(Math.max(Math.round(this.layers), 1), 10);
      if (changes['waveAmplitude']) uniforms.uWaveAmplitude.value = this.waveAmplitude;
      if (changes['waveFrequency']) uniforms.uWaveFrequency.value = this.waveFrequency;
      if (changes['waveSpeed']) uniforms.uWaveSpeed.value = this.waveSpeed;
      if (changes['layerSpeed']) uniforms.uLayerSpeed.value = this.layerSpeed;
      if (changes['twist']) uniforms.uTwist.value = this.twist;
      if (changes['twistFrequency']) uniforms.uTwistFrequency.value = this.twistFrequency;
      if (changes['twistSpeed']) uniforms.uTwistSpeed.value = this.twistSpeed;
      if (changes['lineFrequency']) uniforms.uLineFrequency.value = this.lineFrequency;
      if (changes['lineSpacing']) uniforms.uLineSpacing.value = this.lineSpacing;
      if (changes['lineSharpness']) uniforms.uLineSharpness.value = this.lineSharpness;
      if (changes['glowFalloff']) uniforms.uGlowFalloff.value = this.glowFalloff;
      if (changes['glowIntensity']) uniforms.uGlowIntensity.value = this.glowIntensity;
      if (changes['brightness']) uniforms.uBrightness.value = this.brightness;
      if (changes['blueBoost']) uniforms.uBlueBoost.value = this.blueBoost;
      if (changes['vignette']) uniforms.uVignette.value = this.vignette;
      if (changes['grain']) uniforms.uGrain.value = this.grain;
      if (changes['lightMode']) uniforms.uLightMode.value = this.lightMode ? 1 : 0;
      
      if (changes['paused']) {
        if (this.canAnimate()) this.start();
        else {
          this.stop();
          this.render();
        }
      }
    }
  }

  private setSize = (container: HTMLElement) => {
    const rect = container.getBoundingClientRect();
    this.renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
    this.program.uniforms.uResolution.value[0] = this.gl.drawingBufferWidth;
    this.program.uniforms.uResolution.value[1] = this.gl.drawingBufferHeight;
    this.render();
  };

  private setupObservers(container: HTMLElement) {
    this.resizeObserver = new ResizeObserver(() => this.setSize(container));
    this.resizeObserver.observe(container);

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
      if (this.canAnimate()) this.start();
      else this.stop();
    }, { threshold: 0 });
    this.intersectionObserver.observe(container);

    document.addEventListener('visibilitychange', this.handleVisibility);
    this.reducedMotion?.addEventListener('change', this.handleReducedMotion);
  }

  private handleVisibility = () => {
    this.isPageVisible = !document.hidden;
    if (this.canAnimate()) this.start();
    else this.stop();
  };

  private handleReducedMotion = () => {
    if (this.canAnimate()) this.start();
    else {
      this.stop();
      this.render();
    }
  };

  private render = () => {
    this.renderer.render({ scene: this.mesh });
  };

  private canAnimate = () => {
    return this.isVisible && this.isPageVisible && !this.paused && !this.reducedMotion?.matches;
  };

  private stop = () => {
    if (this.frameId !== 0) cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  };

  private start = () => {
    if (!this.canAnimate() || this.frameId !== 0) return;
    this.previousTime = performance.now();
    // Use ngZone.runOutsideAngular so requestAnimationFrame doesn't trigger change detection repeatedly
    this.ngZone.runOutsideAngular(() => {
      this.frameId = requestAnimationFrame(this.loop);
    });
  };

  private loop = (now: number) => {
    this.frameId = 0;
    if (!this.canAnimate()) return;

    const delta = Math.min((now - this.previousTime) / 1000, 0.1);
    this.previousTime = now;
    this.elapsed += delta;

    if (now - this.lastRenderTime >= 1000 / this.fps - 0.5) {
      this.program.uniforms.uTime.value = this.elapsed;
      this.render();
      this.lastRenderTime = now;
    }

    this.frameId = requestAnimationFrame(this.loop);
  };

  ngOnDestroy() {
    this.stop();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.handleVisibility);
    this.reducedMotion?.removeEventListener('change', this.handleReducedMotion);
    
    if (this.gl) {
      const canvas = this.gl.canvas;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      this.gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }
}
