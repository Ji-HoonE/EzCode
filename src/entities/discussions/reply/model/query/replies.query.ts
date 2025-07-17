import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { IGetRepliesResponse } from './replies.query.types';

export const useRepliesQuery = (problemId: ProblemId, discussionId: number) => {
  const queryParams = {};
  const path = getProblemIdPath(problemId, 'discussions');

  return useQuery({
    queryKey: ['replies', problemId, discussionId],
    queryFn: async () => {
      const response = await ApiHelper.get<IGetRepliesResponse>(`${path}/${discussionId}/replies`, {
        params: queryParams,
      });
      return response.data;
    },

    staleTime: 1000 * 60 * 3,
  });
};

export const useNestedRepliesQuery = (
  problemId: ProblemId,
  discussionId: number,
  parentReplyId: number
) => {
  const queryParams = {};
  const path = getProblemIdPath(problemId, 'discussions');

  return useQuery({
    queryKey: ['nestedReplies', problemId, discussionId, parentReplyId],
    queryFn: async () => {
      const response = await ApiHelper.get<IGetRepliesResponse>(
        `${path}/${discussionId}/replies/${parentReplyId}`,
        {
          params: queryParams,
        }
      );
      return response.data;
    },

    staleTime: 1000 * 60 * 3,
  });
};
