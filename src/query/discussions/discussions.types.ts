import { IDiscussionContentResponse } from '@/features/problem/types/discussion.response.data.type';

export interface IDiscussionContentMutationRequest {
  languageId: number;
  content: string;
}

export type TDiscussionContentMutationResponse = IDiscussionContentResponse;
