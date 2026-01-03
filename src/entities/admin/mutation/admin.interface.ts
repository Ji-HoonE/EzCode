import { ProblemLevelType } from '@/shared/types/problem.type';

export interface IMultipartFormDataRequest {
  categories: string;
  title: string;
  description: string;
  difficulty: ProblemLevelType;
  memoryLimit: number;
  timeLimit: number;
  reference: string;
}

export interface IAdminRegisterProblemRequest {
  request: IMultipartFormDataRequest;
  image?: File;
}
