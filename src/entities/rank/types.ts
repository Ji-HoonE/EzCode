export type TAroundRanking = IRanking & { isMe: boolean };

export interface IRanking {
  userId: number;
  nickname: string;
  ranks: number;
  score: number;
}

export type TRankings = IRanking[];
