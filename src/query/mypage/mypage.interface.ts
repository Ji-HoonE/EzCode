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
    totalSolvedCount : number;
}

export interface AiReview {
    reviewToken:  number
}

export interface DailySolved  {
    dailySolvedCounts : {
        date: string
        count: number
    }[]
    userId : number
  }

  export interface IHeatmapItem {
    date : string
    count : number
    level : number
  }[]