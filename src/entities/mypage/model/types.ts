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
  introduction: string | null;
  verified: boolean;
  totalSolvedCount: number;
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
}

export interface Ranking  {
      userId: number
      nickname: string
      ranks: number
      score: number
      isMe: boolean
    }