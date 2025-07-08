import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { ICreateDiscussionContentRequest } from './discussions.types';
import { IDiscussionContentResponse } from '@/features/problem/types/discussion.response.data.type';

/** 코드리뷰 요청 뮤테이션 */
export const useCreateDiscussionContent = (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'discussions');
  return useMutation({
    mutationFn: async (params: ICreateDiscussionContentRequest) => {
      const response = await ApiHelper.post<IDiscussionContentResponse>(path, params);
      return response;
    },
  });
};
