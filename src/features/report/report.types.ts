export type ReportType =
  | 'PROBLEM_ERROR'
  | 'PROFANITY'
  | 'SPAM'
  | 'SEXUAL_CONTENT'
  | 'HATE_SPEECH'
  | 'PRIVACY_VIOLATION'
  | 'FRAUD'
  | 'IMPERSONATION'
  | 'HARASSMENT'
  | 'POLITICAL_RELIGIOUS'
  | 'OTHER';
type TargetType = 'USER' | 'PROBLEM' | 'POST' | 'COMMENT' | 'OTHER';

//신고할때 필요한 데이터 인터페이스
export interface IReportRequestData {
  targetId: number;
  reportType: ReportType;
  targetType: TargetType;
  message: string;
  imageUrl: string | null;
}

//ReportType 셀렉트 옵션
export const reportTypesSelectOptions: { label: string; value: ReportType }[] = [
  { label: '문제 오류', value: 'PROBLEM_ERROR' },
  { label: '욕설/비속어', value: 'PROFANITY' },
  { label: '스팸/광고', value: 'SPAM' },
  { label: '음란성 표현', value: 'SEXUAL_CONTENT' },
  { label: '혐오 발언', value: 'HATE_SPEECH' },
  { label: '개인정보 노출', value: 'PRIVACY_VIOLATION' },
  { label: '사기/금전 요구', value: 'FRAUD' },
  { label: '도용/사칭', value: 'IMPERSONATION' },
  { label: '괴롭힘', value: 'HARASSMENT' },
  { label: '정치/종교 선동', value: 'POLITICAL_RELIGIOUS' },
  { label: '기타', value: 'OTHER' },
];
