//전체 프로젝트에서 공통으로 사용되는 problem관련 타입들

/* 문제 레벨 */
export type ProblemLevelType = 'LV1' | 'LV2' | 'LV3' | 'LV4' | 'LV5' | 'LV6' | 'LV7';

/* 문제 id 타입 */
export type ProblemId = string;

/* 문제 언어 타입 */
export type ProblemLanguageType = 'Python' | 'Java' | 'C' | 'Cpp';

//언어별 id
export const LANGUAGE_ID: Record<ProblemLanguageType, number> = {
  Java: 1,
  C: 2,
  Cpp: 3,
  Python: 4,
};

//id별 언어
export const LANGUAGE: Record<number, ProblemLanguageType> = {
  1: 'Java',
  2: 'C',
  3: 'Cpp',
  4: 'Python',
};

//언어 선택하는 셀렉트 옵션 타입
export interface ILanguageSelectOption {
  value: ProblemLanguageType;
  label: string;
  id: number;
}
