import { ProblemLevelType } from '@/shared/types/problem.type';

//문제 상세 리스폰스

export interface IDetailProblemResponse {
  id: number;
  creator: string;
  categories: string[];
  title: string;
  description: string;
  score: number;
  difficulty: ProblemLevelType;
  memoryLimit: number;
  timeLimit: number;
  reference: string;
  createdAt: string;
  modifiedAt: string;
}
