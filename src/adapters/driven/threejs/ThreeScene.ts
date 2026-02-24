import * as THREE from 'three';
import type { IScene } from '@domain/ports';

export class ThreeScene implements IScene {
  private readonly scene = new THREE.Scene();

  getNative(): THREE.Scene {
    return this.scene;
  }

  add(obj: unknown): void {
    if (obj instanceof THREE.Object3D) this.scene.add(obj);
  }

  remove(obj: unknown): void {
    if (obj instanceof THREE.Object3D) this.scene.remove(obj);
  }

  clear(): void {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }
}
