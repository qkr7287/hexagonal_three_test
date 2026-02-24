/**
 * 클럭 포트 - 델타타임/경과시간 (애니메이션용)
 */
export interface IClock {
  getDelta(): number;
  getElapsedTime(): number;
}
