import type { IObjectFactory } from '@domain/ports';

/**
 * 테스트용 목 객체 팩토리 - 가짜 메시(플레인 객체) 반환
 */
export class MockObjectFactory implements IObjectFactory {
  createBox(size = 1): unknown {
    return { type: 'box', size };
  }

  createCube(size = 1): unknown {
    return this.createBox(size);
  }
}
