import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { IEngine } from '@domain/ports';
import { ThreeScene } from './ThreeScene';
import { ThreeCamera } from './ThreeCamera';
import { ThreeRenderer } from './ThreeRenderer';
import { ThreeClock } from './ThreeClock';

/**
 * Three.js 엔진 어댑터 - 포트 IEngine 구현.
 * 카메라, 씬, 렌더러, 클럭을 구성하고 컨테이너에 붙인다.
 * 마우스로 (0,0,0) 기준 오빗 컨트롤 지원.
 */
export class ThreeEngine implements IEngine {
  private sceneAdapter: ThreeScene;
  private cameraAdapter: ThreeCamera;
  private rendererAdapter: ThreeRenderer;
  private clockAdapter: ThreeClock;
  private orbitControls: OrbitControls | null = null;
  private container: HTMLElement | null = null;
  private initialized = false;

  constructor(options?: { fov?: number; near?: number; far?: number; antialias?: boolean }) {
    const fov = options?.fov ?? 75;
    const near = options?.near ?? 0.1;
    const far = options?.far ?? 1000;
    const antialias = options?.antialias ?? true;

    this.sceneAdapter = new ThreeScene();
    this.cameraAdapter = new ThreeCamera(fov, near, far);
    this.rendererAdapter = new ThreeRenderer(antialias);
    this.clockAdapter = new ThreeClock();

    this.rendererAdapter.setScene(this.sceneAdapter.getNative());
    this.rendererAdapter.setCamera(this.cameraAdapter.getNative());
  }

  init(container: HTMLElement): void {
    if (this.initialized) return;
    this.container = container;
    const canvas = this.rendererAdapter.getDomElement();
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const camera = this.cameraAdapter.getNative();
    this.orbitControls = new OrbitControls(camera, canvas);
    this.orbitControls.target.set(0, 0, 0);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;

    this.initialized = true;
  }

  update(): void {
    this.orbitControls?.update();
  }

  getScene() {
    return this.sceneAdapter;
  }

  getCamera() {
    return this.cameraAdapter;
  }

  getRenderer() {
    return this.rendererAdapter;
  }

  getClock() {
    return this.clockAdapter;
  }

  resize(width: number, height: number): void {
    const aspect = width / height;
    this.cameraAdapter.setAspect(aspect);
    this.rendererAdapter.setSize(width, height);
  }

  dispose(): void {
    this.orbitControls?.dispose();
    this.orbitControls = null;
    this.rendererAdapter.dispose();
    if (this.container) {
      const canvas = this.rendererAdapter.getDomElement();
      if (canvas.parentNode === this.container) {
        this.container.removeChild(canvas);
      }
      this.container = null;
    }
    this.initialized = false;
  }
}
