import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { IEngine, ICamera } from '@domain/ports';
import { ThreeScene } from '../threejs/ThreeScene';
import { ThreeRenderer } from '../threejs/ThreeRenderer';
import { ThreeClock } from '../threejs/ThreeClock';

/** ICamera 포트의 Orthographic 구현 */
class OrthoCameraAdapter implements ICamera {
  private camera: THREE.OrthographicCamera;

  constructor(left: number, right: number, top: number, bottom: number, near = 0.1, far = 1000) {
    this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    this.camera.position.z = 5;
  }

  getNative(): THREE.OrthographicCamera {
    return this.camera;
  }

  setAspect(aspect: number): void {
    const h = 5;
    const w = h * aspect;
    this.camera.left = -w / 2;
    this.camera.right = w / 2;
    this.camera.top = h / 2;
    this.camera.bottom = -h / 2;
    this.camera.updateProjectionMatrix();
  }

  setPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z);
  }

  lookAt(x: number, y: number, z: number): void {
    this.camera.lookAt(x, y, z);
  }
}

/** Orthographic 카메라를 쓰는 엔진 어댑터 (2D/UI 스타일 씬용) */
export class OrthographicEngine implements IEngine {
  private sceneAdapter: ThreeScene;
  private cameraAdapter: OrthoCameraAdapter;
  private rendererAdapter: ThreeRenderer;
  private clockAdapter: ThreeClock;
  private orbitControls: OrbitControls | null = null;
  private container: HTMLElement | null = null;
  private initialized = false;

  constructor(options?: { antialias?: boolean }) {
    this.sceneAdapter = new ThreeScene();
    this.cameraAdapter = new OrthoCameraAdapter(-2, 2, 2, -2);
    this.rendererAdapter = new ThreeRenderer(options?.antialias ?? true);
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

    this.orbitControls = new OrbitControls(this.cameraAdapter.getNative(), canvas);
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
