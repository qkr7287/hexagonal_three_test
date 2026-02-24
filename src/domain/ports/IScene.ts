/**
 * 씬 포트 - 씬 그래프에 객체 추가/제거 (프레임워크 무관)
 */
export interface IScene {
  add(obj: unknown): void;
  remove(obj: unknown): void;
  clear(): void;
}
