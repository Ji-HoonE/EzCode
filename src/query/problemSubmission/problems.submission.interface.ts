//problem 제출시 리퀘스트 데이터
export interface IProblemRequestData {
  languageId: number;
  sourceCode: string;
}

export interface ISubmissionReviewRequest extends IProblemRequestData {
  isCorrect: boolean;
}

export interface ISubmissionReviewResponse {
  reviewContent: string;
}
