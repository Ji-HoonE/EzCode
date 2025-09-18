import { ReportReasonEnum, ReportStatusEnum } from './enum';

export interface IMyInfo {
  username: string;
  email: string;
  nickname: string;
  userRole: string;
  tier: string;
  age: number;
  githubUrl: string | null;
  blogUrl: string | null;
  profileImageUrl: string | null;
  profileImage?: File;
  introduction: string | null;
  verified: boolean;
  language: {
    id: number;
    judge0Id: number;
    name: string;
    version: string;
  } | null;
  totalSolvedCount: number;
  userAuthTypes: string[];
}

export interface AiReview {
  reviewToken: number;
}

export interface DailySolved {
  dailySolvedCounts: {
    date: string;
    count: number;
  }[];
  userId: number;
}

export interface IHeatmapItem {
  date: string;
  count: number;
  level: number;
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  message: string;
}

export interface SubmissionsResonse {
  problemId: number;
  problemTitle: string;
  problemDescription: string;
  problemDifficulty: string;
  submissions: Submission[];
}

export interface Submission {
  id: number;
  sourceCode: string;
  isCorrect: boolean;
  message: string;
  executionTime: number;
  memoryUsage: number;
  submittedAt: string;
  language: string;
}

export interface Ranking {
  userId: number;
  nickname: string;
  ranks: number;
  score: number;
  isMe: boolean;
}

export interface Report {
  createdAt: string;
  id: number;
  imageUrl: string;
  message: string;
  reportStatus: ReportStatusEnum;
  reportType: keyof typeof ReportReasonEnum;
  resultMessage: string;
  targetId: number;
  targetType: string;
}

export interface ILanguages {
  id: number;
  name: string;
  version: string;
  judge0Id: number;
}

export type IModifyBody = {
  nickname: string | null;
  githubUrl: string | null;
  blogUrl: string | null;
  introduction: string | null;
  age: number;
  languageId: number | null;
};



export interface IUserInfoModifyResponse {
  age: number;
  blogUrl: string;
  email: string;
  githubUrl: string;
  introduction: string;
  language: Language;
  nickname: string;
  profileImageUrl: string;
  tier: string;
  totalSolvedCount: number;
  userAuthTypes: string[]
  userRole: string;
  username: string;
  verified: boolean;
}

export interface Language {
  id: number;
  judge0Id: number;
  name: string;
  version: string;
}