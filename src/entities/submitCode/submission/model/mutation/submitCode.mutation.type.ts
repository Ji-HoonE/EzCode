/**코드 제출시 리퀘스트  */
export interface ISourceCode {
  languageId: number;
  sourceCode: string;
}
export interface ISubmitCodeRequest extends ISourceCode {
  sessionKey: string;
}

export interface ISubmissionReviewRequest extends ISourceCode {
  isCorrect: boolean;
}

export interface ISubmissionReviewResponse {
  reviewContent: string;
}

export interface ISaveDraftResponse {
  problemId: number;
  languageId: number;
  code: string;
  version: number;
}
export type ISaveDraftRequest = ISaveDraftResponse;
