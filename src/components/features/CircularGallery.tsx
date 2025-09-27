import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

type GL = Renderer['gl'];
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}
function lerp(p1: number, p2: number, t: number): number { return p1 + (p2 - p1) * t; }
function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}
function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}
// type for better structure
interface FeatureCardData {
  emoji: string;
  title: string;
  description: string;
  image?: string;
}
// Improved card: emoji + name + content aligned
function createTextTexture(
  gl: GL,
  data?: FeatureCardData | { text?: string },
  font: string = 'bold 30px Figtree, sans-serif',
  color: string = '#fff',
  drawBackground: boolean = false
): { texture: Texture; width: number; height: number } {
  const emoji = (data as FeatureCardData)?.emoji ?? '🖼️';
  const title = (data as FeatureCardData)?.title ?? (data as any)?.text ?? 'Item';
  const description = (data as FeatureCardData)?.description ?? '';
  // Larger card
  const cardWidth = 768, cardHeight = 512;
  const pad = Math.round(cardWidth * 0.08);
  const canvas = document.createElement('canvas');
  canvas.width = cardWidth;
  canvas.height = cardHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d context');
  // Optional Card bg (kept transparent when drawBackground=false)
  ctx.clearRect(0, 0, cardWidth, cardHeight);
  if (drawBackground) {
    ctx.fillStyle = 'rgba(17,20,31,0.965)';
    ctx.strokeStyle = 'rgba(115,233,180, 0.22)';
    ctx.lineWidth = 2.5;
    const r = 46;
    ctx.beginPath();
    ctx.moveTo(r,0); ctx.lineTo(cardWidth-r,0); ctx.quadraticCurveTo(cardWidth,0,cardWidth,r);
    ctx.lineTo(cardWidth,cardHeight-r); ctx.quadraticCurveTo(cardWidth,cardHeight,cardWidth-r,cardHeight);
    ctx.lineTo(r,cardHeight); ctx.quadraticCurveTo(0,cardHeight,0,cardHeight-r);
    ctx.lineTo(0,r); ctx.quadraticCurveTo(0,0,r,0);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  }
  // Emoji
  ctx.font = `bold ${Math.round(cardHeight * 0.28)}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#8de6c1';
  ctx.fillText(emoji, cardWidth/2, Math.round(cardHeight * 0.08));
  // Title (wrap to max 2 lines, centered)
  ctx.fillStyle = color;
  let titleFontSize = Math.round(cardHeight * 0.11);
  ctx.font = `bold ${titleFontSize}px Figtree, sans-serif`;
  const maxTitleWidth = cardWidth - 2 * pad;
  const titleWords = title.split(' ');
  let titleLines: string[] = [];
  let tLine = '';
  for (let i = 0; i < titleWords.length; i++) {
    const test = (tLine + titleWords[i] + ' ').trim();
    if (ctx.measureText(test).width > maxTitleWidth && tLine) {
      titleLines.push(tLine.trim());
      tLine = titleWords[i] + ' ';
    } else {
      tLine = test + ' ';
    }
  }
  if (tLine) titleLines.push(tLine.trim());
  if (titleLines.length > 2) titleLines = titleLines.slice(0, 2);
  const titleLineHeight = Math.round(titleFontSize * 1.2);
  let titleY = Math.round(cardHeight * 0.38);
  for (let i = 0; i < titleLines.length; i++) {
    ctx.fillText(titleLines[i], cardWidth / 2, titleY);
    titleY += titleLineHeight;
  }
  // Description (wrapped, centered)
  const descFontSize = Math.round(cardHeight * 0.068);
  ctx.font = `${descFontSize}px Figtree, sans-serif`;
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#cafccd';
  const descWords = description.split(' ');
  let dLine = '';
  let y = titleY + 8;
  const maxDescWidth = cardWidth - 2 * pad;
  const descLineHeight = Math.round(descFontSize * 1.45);
  const available = cardHeight - pad - (titleY + 8);
  const maxLines = Math.max(1, Math.floor(available / descLineHeight));
  let linesDrawn = 0;
  for (let i = 0; i < descWords.length; i++) {
    const test = dLine + descWords[i] + ' ';
    if (ctx.measureText(test).width > maxDescWidth && dLine) {
      ctx.fillText(dLine.trim(), cardWidth / 2, y);
      linesDrawn++;
      if (linesDrawn >= maxLines) { dLine = ''; break; }
      dLine = descWords[i] + ' ';
      y += descLineHeight;
    } else {
      dLine = test;
    }
  }
  if (dLine && linesDrawn < maxLines) ctx.fillText(dLine.trim(), cardWidth / 2, y);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}
interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  feature: FeatureCardData;
  textColor?: string;
  font?: string;
}
class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  feature: FeatureCardData;
  textColor: string;
  font: string;
  mesh!: Mesh;
  constructor({ gl, plane, renderer, feature, textColor = '#545050', font = '30px sans-serif' }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.feature = feature;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.feature, this.font, this.textColor, false);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragment: `precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main() { vec4 color = texture2D(tMap, vUv); if (color.a < 0.1) discard; gl_FragColor = color; }`,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.8;
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y = 0;
    this.mesh.position.z = 0.001;
    this.mesh.setParent(this.plane);
  }
}
interface ScreenSize { width: number; height: number; }
interface Viewport { width: number; height: number; }
interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  feature: FeatureCardData;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}
class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  feature: FeatureCardData;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    feature,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.feature = feature;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    // Text is composited inside the card shader now; no separate Title mesh.
    this.onResize();
  }
  createShader() {
    const imageTexture = new Texture(this.gl, { generateMipmaps: true });
    const { texture: textTexture, width: textW, height: textH } = createTextTexture(
      this.gl,
      this.feature,
      this.font ?? 'bold 30px Figtree, sans-serif',
      this.textColor ?? '#fff',
      false
    );
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `precision highp float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform float uTime; uniform float uSpeed; varying vec2 vUv; void main() { vUv = uv; vec3 p = position; p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5); gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
      fragment: `precision highp float; uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; uniform vec2 uTextSizes; uniform sampler2D tMap; uniform sampler2D tText; uniform float uBorderRadius; varying vec2 vUv; float roundedBoxSDF(vec2 p, vec2 b, float r) { vec2 d = abs(p) - b; return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r; } void main() { vec2 ratio = vec2( min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0), min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0) ); vec2 uv = vec2( vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5 ); vec4 imgCol = texture2D(tMap, uv); vec2 textRatio = vec2( min((uPlaneSizes.x / uPlaneSizes.y) / (uTextSizes.x / uTextSizes.y), 1.0), min((uPlaneSizes.y / uPlaneSizes.x) / (uTextSizes.y / uTextSizes.x), 1.0) ); vec2 tUv = (vUv - 0.5) / textRatio + 0.5; vec4 textCol = texture2D(tText, tUv); vec4 color = mix(imgCol, textCol, textCol.a); float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius); float edgeSmooth = 0.002; float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d); gl_FragColor = vec4(color.rgb, alpha); }`,
      uniforms: {
        tMap: { value: imageTexture },
        tText: { value: textTexture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uTextSizes: { value: [textW, textH] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    if (this.image) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = this.image;
      img.onload = () => {
        imageTexture.image = img;
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = 410;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(17,20,31,0.965)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      imageTexture.image = canvas;
      this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
    }
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      feature: this.feature,
      textColor: this.textColor,
      font: this.font
    });
  }
  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    this.scale = this.screen.height / 1500;
    const CARD_HEIGHT_RATIO = 0.55; // portion of viewport height
    const CARD_WIDTH_RATIO = 0.33;  // portion of viewport width
    this.plane.scale.y = this.viewport.height * CARD_HEIGHT_RATIO;
    this.plane.scale.x = this.viewport.width * CARD_WIDTH_RATIO;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = this.plane.scale.x * 0.22;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}
interface AppConfig {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}
class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: Array<FeatureCardData | { image?: string; text: string }> = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;
  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;
  isDown: boolean = false;
  start: number = 0;
  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05
    }: AppConfig
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }
  createMedias(
    items: Array<FeatureCardData | { image?: string; text: string }> | undefined,
    bend: number = 1,
    textColor: string,
    borderRadius: number,
    font: string
  ) {
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: 'Palm Trees' }
    ];
    // Only use the provided items, not defaults, for feature carousel
    const galleryItems = items && items.length ? items : [
      { emoji: "🗺️", title: "Global Map Exploration", description: "Pan, zoom, and discover flowers anywhere on earth. Animated markers show real-time data and bloom cycles." },
      { emoji: "🌸", title: "Live Flower Snapshots", description: "Tap a flower marker to view its detailed, animated phenology with blooming periods, climate info, and more." },
      { emoji: "✏️", title: "Drawing & Analysis Tools", description: "Draw a shape, select any region, and analyze local flowering phenomena, fully interactively!" },
      { emoji: "🌍", title: "Environmental Context", description: "See climate, region, and blooming period at a glance for every flower and area on the map." },
      { emoji: "🌗", title: "Beautiful Dark Mode", description: "Every detail is tuned for optimal readability and aesthetics — day or night." },
      { emoji: "🔍", title: "Discover & Compare", description: "Explore rare, seasonal, and diverse species visually and compare how climate shapes global flora." },
    ];
    this.mediasImages = galleryItems; // don't concat/duplicate; 1:1 mapping
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: (data as any).image || '',
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        feature: data as any, // pass the full feature card object
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }
  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  onWheel(e: Event) {
    const wheelEvent = e as WheelEvent;
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}
export interface CircularGalleryProps {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  style?: React.CSSProperties;
}
export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05,
  style
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mergedStyle = { marginTop: '48px', ...style } as React.CSSProperties;
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase
    });
    return () => { app.destroy(); };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);
  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} style={mergedStyle} />;
}
