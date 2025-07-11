import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ICreateReplyMutationRequest,
  IEditReplyMutationRequest,
  IReplyMutationResponse,
} from './replies.mutation.types';

/** 댓글, 대댓글 생성 뮤테이션  */
export const useCreateReplyMutation = (
  problemId: ProblemId,
  discussionId: number,
  isNestedReply?: boolean,
  parentReplyId?: number
) => {
  const path = getProblemIdPath(problemId, 'discussions');
  const queryClient = useQueryClient();

  const queryKey = isNestedReply
    ? ['nestedReplies', problemId, discussionId, parentReplyId]
    : ['replies', problemId, discussionId];

  return useMutation({
    mutationFn: async (params: ICreateReplyMutationRequest) => {
      const response = await ApiHelper.post<IReplyMutationResponse>(
        `${path}/${discussionId}/replies`,
        params
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
};

/** 댓글, 대댓글 수정 뮤테이션 수정시에는 invalidation 필요 없음 */
export const useEditReplyMutation = (
  problemId: ProblemId,
  discussionId: number,
  replyId: number
) => {
  const path = getProblemIdPath(problemId, 'discussions');
  return useMutation({
    mutationFn: async (params: IEditReplyMutationRequest) => {
      const response = await ApiHelper.put<IReplyMutationResponse>(
        `${path}/${discussionId}/replies/${replyId}`,
        params
      );
      return response.data;
    },
  });
};

/** 대댓글, 댓글 삭제 뮤테이션 */
export const useDeleteReplyMutation = (
  problemId: ProblemId,
  discussionId: number,
  replyId: number,
  queryKey: [string, string, number]
) => {
  const path = getProblemIdPath(problemId, 'discussions');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.delete(`${path}/${discussionId}/replies/${replyId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};
