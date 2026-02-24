/**
 * 카메라 포트 - 위치/방향/종횡비 (프레임워크 무관)
 */
export interface ICamera {
  setAspect(aspect: number): void;
  setPosition(x: number, y: number, z: number): void;
  lookAt(x: number, y: number, z: number): void;
}
