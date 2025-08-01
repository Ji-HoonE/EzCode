import { TVoteStatus } from '@/entities/discussions/vote/model/vote.mutation.type';
import { IUserInfo } from '@/shared/types/auth';
import { IPageAble } from '@/shared/types/pagenation';

/**토론글 sort */
export type sortType = '최신순' | '인기순' | '추천 많은순';

/**토론글 get 요청시, 리스폰스(res.data.result) 로 받는 인터페이스  */
export interface IDiscussionResponse {
  content: IDiscussionContentResponse[];
  pageable: IPageAble;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

/** 토론글 하나 의 인터페이스  */
export interface IDiscussionContentResponse {
  discussionId: number;
  userInfo: IUserInfo;
  problemId: number;
  content: string;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
  replyCount: number;
  voteStatus: TVoteStatus;
  isAuthor: boolean;
  languageId: number;
}
