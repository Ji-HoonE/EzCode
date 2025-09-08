import { IDiscussionContentMutationRequest } from './mutation/discussions.types';
import { INITIAL_LANGUAGE_ID } from '@/shared/lib/codemirror/codeMirror.Docs';

export const DISCUSSION_CREATE_VALUE: IDiscussionContentMutationRequest = {
  languageId: INITIAL_LANGUAGE_ID,
  content: '',
};
