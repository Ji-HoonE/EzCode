/**mutation & query */
export { useDiscussionsQuery } from './model/query/discussions.query';
export { useCreateDiscussionContent } from './model/mutation/discussions.mutations';
export { useEditDiscussionContent } from './model/mutation/discussions.mutations';
export { useDeleteDiscussionContent } from './model/mutation/discussions.mutations';

export { DISCUSSION_CREATE_VALUE } from './model/initial.value';

export type { IDiscussionContentMutationRequest } from './model/mutation/discussions.types';
export type { TDiscussionContentMutationResponse } from './model/mutation/discussions.types';

export type { IDiscussionResponse } from './model/query/discussion.query.type';
export type { IDiscussionContentResponse } from './model/query/discussion.query.type';
