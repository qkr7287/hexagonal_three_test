import * as THREE from 'three';
import type { IClock } from '@domain/ports';

export class ThreeClock implements IClock {
  private readonly clock = new THREE.Clock();

  getDelta(): number {
    return this.clock.getDelta();
  }

  getElapsedTime(): number {
    return this.clock.getElapsedTime();
  }
}
