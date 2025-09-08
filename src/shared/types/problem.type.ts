//전체 프로젝트에서 공통으로 사용되는 problem관련 타입들

/* 문제 레벨 */
export type ProblemLevelType = 'LV1' | 'LV2' | 'LV3' | 'LV4' | 'LV5' | 'LV6' | 'LV7';

/* 문제 id 타입 */
export type ProblemId = string;

/* 문제 언어 타입 */
export type ProblemLanguageType = 'Python' | 'Java' | 'C' | 'Cpp';

//id별 언어
export const LANGUAGE: Record<number, ProblemLanguageType> = {
  1: 'Java',
  2: 'C',
  3: 'Cpp',
  4: 'Python',
};
