import type { IEngine } from '@domain/ports';
import type { IObjectFactory } from '@domain/ports';
import { MainLoop } from '@application/MainLoop';

/**
 * 브라우저 진입점 - 컨테이너에 엔진·팩토리를 주입하고 메인 로직만 실행
 */
export function runScene(container: HTMLElement, engine: IEngine, factory?: IObjectFactory): MainLoop {
  const loop = new MainLoop(engine, container);
  loop.start(factory);
  return loop;
}
