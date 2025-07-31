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
      try {
        const res = await ApiHelper.get<IDiscussionResponse>(`${path}`, {
          params: queryParams,
        });
        return res.data.result.content;
      } catch {
        console.error('토론 목록을 불러오는데 실패했습니다.');
        return [];
      }
    },
    staleTime: 1000 * 60 * 3,
  });
};
