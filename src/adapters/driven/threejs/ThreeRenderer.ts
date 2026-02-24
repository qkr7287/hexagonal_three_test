import * as THREE from 'three';
import type { IRenderer } from '@domain/ports';

export class ThreeRenderer implements IRenderer {
  private readonly renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene | null = null;
  private camera: THREE.Camera | null = null;

  constructor(antialias = true) {
    this.renderer = new THREE.WebGLRenderer({ antialias });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setScene(scene: THREE.Scene): void {
    this.scene = scene;
  }

  setCamera(camera: THREE.Camera): void {
    this.camera = camera;
  }

  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
  }

  render(): void {
    if (this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  getDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  dispose(): void {
    this.renderer.dispose();
    this.scene = null;
    this.camera = null;
  }
}
