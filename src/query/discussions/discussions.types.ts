import { IDiscussionContentResponse } from '@/features/problem/types/discussion.response.data.type';

export interface ICreateDiscussionContentRequest {
  languageId: number;
  content: string;
}

export interface ICreateDiscussionContentResponse {
  content: IDiscussionContentResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
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
