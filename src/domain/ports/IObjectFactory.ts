/**
 * 객체 팩토리 포트 - 씬에 넣을 메시 생성 (어댑터별 구현)
 */
export interface IObjectFactory {
  createBox(size?: number): unknown;
  createCube(size?: number): unknown;
}
