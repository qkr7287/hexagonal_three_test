/**
 * 예시 프로젝트 진입점 - 어댑터 조립 후 메인 로직에만 접근
 */
import { runScene } from '@adapters/driving';
import { ThreeEngine } from '@adapters/driven/threejs';
import { ThreeObjectFactory } from '@adapters/driven/threejs';

const container = document.getElementById('app');
if (!container) throw new Error('#app not found');

const engine = new ThreeEngine({ fov: 75, antialias: true });
const factory = new ThreeObjectFactory();

runScene(container, engine, factory);
