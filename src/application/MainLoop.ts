import type { IEngine } from '@domain/ports';
import type { IObjectFactory } from '@domain/ports';

/**
 * 메인 로직 - 포트(인터페이스)에만 의존.
 * 엔진 초기화, 선택적 기본 메시 추가, 렌더 루프, 리사이즈 처리.
 */
export class MainLoop {
  private engine: IEngine;
  private container: HTMLElement;
  private rafId: number | null = null;
  private boundTick: () => void;
  private boundResize: () => void;

  constructor(engine: IEngine, container: HTMLElement) {
    this.engine = engine;
    this.container = container;
    this.boundTick = () => this.tick();
    this.boundResize = () => this.onResize();
  }

  /**
   * 엔진 초기화 후 선택적으로 기본 장면 구성 (팩토리 있으면 박스 추가)
   */
  start(factory?: IObjectFactory): void {
    this.engine.init(this.container);
    if (factory) {
      const cube = factory.createCube(1);
      this.engine.getScene().add(cube);
    }
    this.onResize();
    window.addEventListener('resize', this.boundResize);
    this.tick();
  }

  private onResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.engine.resize(width, height);
  }

  private tick(): void {
    this.rafId = requestAnimationFrame(this.boundTick);
    this.engine.update();
    this.engine.getRenderer().render();
  }

  stop(): void {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener('resize', this.boundResize);
    this.engine.dispose();
  }
}
