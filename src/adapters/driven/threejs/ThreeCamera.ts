import * as THREE from 'three';
import type { ICamera } from '@domain/ports';

export class ThreeCamera implements ICamera {
  private readonly camera: THREE.PerspectiveCamera;

  constructor(fov = 75, near = 0.1, far = 1000) {
    this.camera = new THREE.PerspectiveCamera(fov, 1, near, far);
    this.camera.position.z = 5;
  }

  getNative(): THREE.PerspectiveCamera {
    return this.camera;
  }

  setAspect(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  setPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z);
  }

  lookAt(x: number, y: number, z: number): void {
    this.camera.lookAt(x, y, z);
  }
}
