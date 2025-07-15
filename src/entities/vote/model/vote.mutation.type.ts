export interface IVoteMutationRequest {
  voteType: TVoteStatus;
}

export interface IVoteMutationResponse {
  voteType: TVoteStatus;
  upvoteCount: number;
  downvoteCount: number;
}

export type TVoteStatus = 'UP' | 'DOWN' | 'NONE';
