export interface ISubmitPrepareData {
  sessionKey: string | null;
  testcaseIds: number[] | null;
}

export interface IDraftResponse {
  problemId: number;
  languageId: number;
  code: string;
  version: number;
}
