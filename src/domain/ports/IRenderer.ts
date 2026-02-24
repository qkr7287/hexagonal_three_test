/**
 * 렌더러 포트 - 크기 설정, 한 프레임 렌더, DOM 요소, 해제
 */
export interface IRenderer {
  setSize(width: number, height: number): void;
  render(): void;
  getDomElement(): HTMLElement;
  dispose(): void;
}
