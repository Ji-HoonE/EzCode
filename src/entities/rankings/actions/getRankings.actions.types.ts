export type TRankings = IRanking[];

export interface IRanking {
  userId: number;
  nickname: string;
  ranks: number;
  score: number;
}
