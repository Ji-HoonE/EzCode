/**
 * @description 관리자 테스트 케이스 인터페이스
 */
export interface ITestCaseResponse {
  id: number;
  problemId: number;
  input: string;
  output: string;
}

export interface IRegisterTestCaseRequest {
  problemId: number;
  input: string;
  output: string;
}

export interface IUpdateTestCaseRequest {
  problemId: number;
  testcaseId: number;
  input: string;
  output: string;
}

export interface IDeleteTestCaseRequest {
  problemId: number;
  testcaseId: number;
}

/**
 * @description 관리자 문제 인터페이스
 */

export interface IRegisterProblemCategoryRequest {
  categoryCode: string;
  categoryName: string;
}

export interface IUpdateProblemImageRequest {
  problemId: number;
  image: File | null;
}

export interface IRegisterProblemRequest {
  request: IProblemRequest;
  image: File | null;
}

export interface IUpdateProblemRequest extends IRegisterProblemRequest {
  problemId: number;
}

interface IProblemRequest {
  categories: Record<string, string>;
  title: string;
  description: string;
  difficulty: string;
  memoryLimit: number;
  timeLimit: number;
  reference: string;
}
