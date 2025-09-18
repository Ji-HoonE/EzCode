import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import ApiHelper from '@/api/client/api';
import { IVoteMutationRequest, IVoteMutationResponse } from './vote.mutation.type';

/** 투표 뮤테이션 - 토론, 댓글, 대댓글 공통 */
export const useVoteStatusMutation = (
  problemId: ProblemId,
  discussionId: number,
  id: number,
  type: 'discussion' | 'reply'
) => {
  const defaultPath = getProblemIdPath(problemId, 'discussions') + `/${discussionId}`;
  const path = type === 'discussion' ? defaultPath : defaultPath + `/replies/${id}`;

  return useMutation({
    mutationFn: async (params: IVoteMutationRequest) => {
      const response = await ApiHelper.post<IVoteMutationResponse>(`${path}/votes`, params);
      return response.data;
    },
  });
};
