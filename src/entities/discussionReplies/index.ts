/**query */
export { useRepliesQuery } from './model/query/replies.query';
export { useNestedRepliesQuery } from './model/query/replies.query';

export type { IGetRepliesResponse } from './model/query/replies.query.types';
export type { IReply } from './model/query/replies.query.types';

/**mutation */
export { useCreateReplyMutation } from './model/mutation/replies.mutation';
export { useEditReplyMutation } from './model/mutation/replies.mutation';
export { useDeleteReplyMutation } from './model/mutation/replies.mutation';

export type { ICreateReplyMutationRequest } from './model/mutation/replies.mutation.types';
export type { IEditReplyMutationRequest } from './model/mutation/replies.mutation.types';
export type { IReplyMutationResponse } from './model/mutation/replies.mutation.types';
