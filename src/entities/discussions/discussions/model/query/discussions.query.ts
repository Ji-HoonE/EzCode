'use client';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IDiscussionResponse } from './discussion.query.type';
import { formattedSort, paramsQueryKeys } from '@/shared/model/query/paramsQueryKey';
import { useDiscussionParams } from '@/features/discussions/disussions/model/Discussion.sort.context';

export const useInfiniteDiscussionsQuery = (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'discussions');
  const { params } = useDiscussionParams();

  const { size = '8', sort, sortBy } = params;

  const queryKey = paramsQueryKeys.key('infinite-discussions', problemId, params);

  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam }) => {
      try {
        const res = await ApiHelper.get<IDiscussionResponse>(`${path}`, {
          params: {
            sortBy: formattedSort[sortBy],
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
