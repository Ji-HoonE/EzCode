import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import ApiHelper from '@/api/client/api';
import { IVoteMutationRequest, IVoteMutationResponse } from './vote.mutation.type';

/** 투표 뮤테이션 - 토론, 댓글, 대댓글 공통 */
export const useVoteStatusMutation = (
  problemId: ProblemId,
  discussionId: number,
  replyId?: number
) => {
  const defaultPath = getProblemIdPath(problemId, 'discussions') + `/${discussionId}`;
  const path = replyId ? defaultPath + `/replies/${replyId}` : defaultPath;

  return useMutation({
    mutationFn: async (params: IVoteMutationRequest) => {
      const response = await ApiHelper.post<IVoteMutationResponse>(`${path}/votes`, params);
      return response.data;
    },
  });
};
