import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import {
  IDiscussionContentMutationRequest,
  IDiscussionContentMutationResponse,
} from './discussions.types';

/** 토론글 생성 뮤테이션 */
export const useCreateDiscussionContent = (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'discussions');
  return useMutation({
    mutationFn: async (params: IDiscussionContentMutationRequest) => {
      const response = await ApiHelper.post<IDiscussionContentMutationResponse>(path, params);
      return response;
    },
  });
};

/** 토론글 수정 뮤테이션 */
export const useEditDiscussionContent = (problemId: ProblemId, discussionId: number) => {
  const path = getProblemIdPath(problemId, 'discussions');
  return useMutation({
    mutationFn: async (params: IDiscussionContentMutationRequest) => {
      const response = await ApiHelper.put<IDiscussionContentMutationResponse>(
        `${path}/${discussionId}`,
        params
      );
      return response;
    },
  });
};

/** 토론글 삭제 뮤테이션 */
export const useDeleteDiscussionContent = (problemId: ProblemId, discussionId: number) => {
  const path = getProblemIdPath(problemId, 'discussions');
  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.delete(`${path}/${discussionId}`);
      return response;
    },
  });
};
