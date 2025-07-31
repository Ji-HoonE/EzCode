'use client';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { IDiscussionResponse } from './discussion.query.type';

//토론 불러오기
export const useDiscussionsQuery = (
  problemId: ProblemId,
  pageable: { page: string; size: string; sort: string }
) => {
  const { page = '0', size = '8', sort } = pageable;
  const path = getProblemIdPath(problemId, 'discussions');

  const formattedSort = sort === '최신순' ? 'latest' : 'best';

  return useQuery({
    queryKey: ['discussions', problemId, page, size, sort],
    queryFn: async () => {
      try {
        const res = await ApiHelper.get<IDiscussionResponse>(`${path}`, {
          params: { page, size, sort: formattedSort },
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
