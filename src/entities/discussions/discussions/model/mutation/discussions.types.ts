import { IDiscussionContentResponse } from '../query/discussion.query.type';

export interface IDiscussionContentMutationRequest {
  languageId: number;
  content: string;
}

export type TDiscussionContentMutationResponse = IDiscussionContentResponse;
