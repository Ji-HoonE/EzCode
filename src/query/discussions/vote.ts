import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { IVoteMutationRequest, IVoteMutationResponse } from './vote.type';
import ApiHelper from '@/api/client/api';

/** 토론글 투표 뮤테이션 */
export const useVoteStatusMutation = (problemId: ProblemId, discussionId: number) => {
  const path = getProblemIdPath(problemId, 'discussions');
  return useMutation({
    mutationFn: async (params: IVoteMutationRequest) => {
      const response = await ApiHelper.post<IVoteMutationResponse>(
        `${path}/${discussionId}/votes`,
        params
      );
      return response.data;
    },
  });
};
