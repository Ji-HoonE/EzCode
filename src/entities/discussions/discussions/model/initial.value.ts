import { INITIAL_LANG } from '@/shared';
import { IDiscussionContentMutationRequest } from './mutation/discussions.types';
import { LANGUAGE_ID } from '@/shared/types/problem.type';

export const DISCUSSION_CREATE_VALUE: IDiscussionContentMutationRequest = {
  languageId: LANGUAGE_ID[INITIAL_LANG],
  content: '',
};
