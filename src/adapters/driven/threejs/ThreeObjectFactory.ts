import * as THREE from 'three';
import type { IObjectFactory } from '@domain/ports';

export class ThreeObjectFactory implements IObjectFactory {
  createBox(size = 1): unknown {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshNormalMaterial();
    return new THREE.Mesh(geometry, material);
  }

  createCube(size = 1): unknown {
    return this.createBox(size);
  }
}
