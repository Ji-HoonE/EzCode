import { ProblemId } from '@/shared';
import { ISubmitCodeRequest } from './submitCode.mutation.type';
import { useMutation } from '@tanstack/react-query';
import { getProblemIdPath } from '@/api/constants/api.constants';
import ApiHelper from '@/api/client/api';

//문제 제출하기
export const useSubmissionForResultMutationT = (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'submit-ready');
  return useMutation({
    mutationFn: async (params: ISubmitCodeRequest) => {
      const response = await ApiHelper.post(path, params);
      return response;
    },
  });
};
