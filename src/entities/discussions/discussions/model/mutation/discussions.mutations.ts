import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  IDiscussionContentMutationRequest,
  TDiscussionContentMutationResponse,
} from './discussions.types';
import { useDiscussionParams } from '@/features/discussions/disussions/model/Discussion.sort.context';
import { paramsQueryKeys } from '@/shared/model/query/paramsQueryKey';

/** 토론글 생성 뮤테이션 */
export const useCreateDiscussionContent = (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'discussions');
  const queryClient = useQueryClient();
  const { params } = useDiscussionParams();

  const queryKey = paramsQueryKeys.key('infinite-discussions', problemId, params);

  return useMutation({
    mutationFn: async (params: IDiscussionContentMutationRequest) => {
      const response = await ApiHelper.post<TDiscussionContentMutationResponse>(path, params);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

/** 토론글 수정 뮤테이션 */
export const useEditDiscussionContent = (problemId: ProblemId, discussionId: number) => {
  const path = getProblemIdPath(problemId, 'discussions');
  const queryClient = useQueryClient();

  const { params } = useDiscussionParams();

  const queryKey = paramsQueryKeys.key('infinite-discussions', problemId, params);
  return useMutation({
    mutationFn: async (params: IDiscussionContentMutationRequest) => {
      const response = await ApiHelper.put<TDiscussionContentMutationResponse>(
        `${path}/${discussionId}`,
        params
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

/** 토론글 삭제 뮤테이션 */
export const useDeleteDiscussionContent = (problemId: ProblemId, discussionId: number) => {
  const path = getProblemIdPath(problemId, 'discussions');
  const queryClient = useQueryClient();

  const { params } = useDiscussionParams();

  const queryKey = paramsQueryKeys.key('infinite-discussions', problemId, params);

  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.delete(`${path}/${discussionId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};
