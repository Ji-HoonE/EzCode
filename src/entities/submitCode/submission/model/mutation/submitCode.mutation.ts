import { ProblemId } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { getProblemIdPath } from '@/api/constants/api.constants';
import ApiHelper from '@/api/client/api';
import {
  ISubmissionReviewRequest,
  ISubmissionReviewResponse,
  ISubmitCodeRequest,
} from './submitCode.mutation.type';

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

/** 코드리뷰 요청 뮤테이션 */
export const useISubmissionForReviewMutation = (problemId: ProblemId) => {
  return useMutation({
    mutationFn: async (params: ISubmissionReviewRequest) => {
      const path = getProblemIdPath(problemId, 'review');

      const response = await ApiHelper.post<ISubmissionReviewResponse>(path, params);
      return response.data.result.reviewContent;
    },
  });
};
