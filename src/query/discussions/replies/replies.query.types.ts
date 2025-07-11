import { TVoteStatus } from '@/features/problem/types/discussion.response.data.type';
import { IUserInfo } from '@/shared/types/auth';

export interface IGetRepliesResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: IReply[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IReply {
  replyId: number;
  parentReplyId: number;
  discussionId: number;
  userInfo: IUserInfo;
  content: string;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
  childReplyCount: number;
  voteStatus: TVoteStatus;
  isAuthor: true;
}
