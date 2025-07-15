'use client';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { IDiscussionResponse } from './discussion.query.type';

//토론 불러오기
export const useDiscussionsQuery = (problemId: ProblemId) => {
  const queryParams = {};
  const path = getProblemIdPath(problemId, 'discussions');

  return useQuery({
    queryKey: ['discussions', problemId],
    queryFn: async () => {
      const res = await ApiHelper.get<IDiscussionResponse>(`${path}`, {
        params: queryParams,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 3,
  });
};
