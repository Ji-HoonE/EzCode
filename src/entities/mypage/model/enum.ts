export enum ReportStatusEnum {
  Pending = 'PENDING',
  InProgress = 'IN_PROGRESS',
  Resolved = 'RESOLVED',
  Rejected = 'REJECTED', // 기각
  Canceled = 'CANCELED', //사용자 철회
}

export enum ReportReasonEnum {
  PROBLEM_ERROR = '문제 오류',
  PROFANITY = '욕설/비속어',
  SPAM = '스팸/도배',
  SEXUAL_CONTENT = '음란성 표현',
  HATE_SPEECH = '혐오 발언',
  PRIVACY_VIOLATION = '개인정보 노출',
  FRAUD = '사기/금전 요구',
  IMPERSONATION = '도용/사칭',
  HARASSMENT = '괴롭힘',
  POLITICAL_RELIGIOUS = '정치/종교 선동',
  OTHER = '기타',
}
