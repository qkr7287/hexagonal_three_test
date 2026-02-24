import type { IEngine, IScene, ICamera, IRenderer, IClock } from '@domain/ports';

const noop = () => {};

const mockScene: IScene = {
  add: noop,
  remove: noop,
  clear: noop,
};

const mockCamera: ICamera = {
  setAspect: noop,
  setPosition: noop,
  lookAt: noop,
};

function createMockRenderer(): IRenderer {
  const el = document.createElement('div');
  return {
    setSize: noop,
    render: noop,
    getDomElement: () => el,
    dispose: noop,
  };
}

const mockClock: IClock = {
  getDelta: () => 0.016,
  getElapsedTime: () => 0,
};

/**
 * 테스트/헤드리스용 목 엔진 - DOM/WebGL 없이 포트만 충족
 */
export class MockEngine implements IEngine {
  private renderer = createMockRenderer();
  private _initialized = false;

  init(container: HTMLElement): void {
    container.appendChild(this.renderer.getDomElement());
    this._initialized = true;
  }

  getScene(): IScene {
    return mockScene;
  }

  getCamera(): ICamera {
    return mockCamera;
  }

  getRenderer(): IRenderer {
    return this.renderer;
  }

  getClock(): IClock {
    return mockClock;
  }

  update(): void {}

  resize(): void {}

  dispose(): void {
    this._initialized = false;
  }
}
