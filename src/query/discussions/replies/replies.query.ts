import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { IGetRepliesResponse } from './replies.type';

export const useRepliesQuery = (problemId: ProblemId, discussionId: number) => {
  const queryParams = {};
  const path = getProblemIdPath(problemId, 'discussions');

  return useQuery({
    queryKey: ['replies'],
    queryFn: async () => {
      const response = await ApiHelper.get<IGetRepliesResponse>(`${path}/${discussionId}/replies`, {
        params: queryParams,
      });
      return response.data;
    },

    staleTime: 1000 * 60 * 3,
  });
};
