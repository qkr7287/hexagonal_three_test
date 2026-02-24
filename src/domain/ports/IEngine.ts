import type { IScene } from './IScene';
import type { ICamera } from './ICamera';
import type { IRenderer } from './IRenderer';
import type { IClock } from './IClock';

/**
 * 엔진 포트 - 씬/카메라/렌더러/클럭을 묶은 진입점.
 * 메인 로직은 이 인터페이스로만 접근한다.
 */
export interface IEngine {
  init(container: HTMLElement): void;
  getScene(): IScene;
  getCamera(): ICamera;
  getRenderer(): IRenderer;
  getClock(): IClock;
  /** 매 프레임 호출 (오빗 등 컨트롤 갱신용). 구현체에서 선택 처리 */
  update(): void;
  resize(width: number, height: number): void;
  dispose(): void;
}
