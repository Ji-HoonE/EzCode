'use client';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IDiscussionResponse, sortType } from './discussion.query.type';

const formattedSort: Record<sortType, string> = {
  인기순: 'best',
  최신순: 'latest',
  '추천 많은순': 'upvote',
};

export const useInfiniteDiscussionsQuery = (
  problemId: ProblemId,
  pageable: { page: string; size: string; sort: sortType }
) => {
  const path = getProblemIdPath(problemId, 'discussions');
  const { size = '8', sort } = pageable;

  return useInfiniteQuery({
    queryKey: ['infinite-discussions', problemId, size, formattedSort[sort]],
    queryFn: async ({ pageParam }) => {
      try {
        const res = await ApiHelper.get<IDiscussionResponse>(`${path}`, {
          params: {
            sortBy: formattedSort[sort],
            page: String(pageParam),
            size,
            sort: formattedSort[sort],
          },
        });
        return res.data.result;
      } catch {
        console.error('토론 목록을 불러오는데 실패했습니다.');
        return { content: [], last: true };
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.last ? undefined : allPages.length;
    },
    staleTime: 1000 * 60 * 3,
  });
};
