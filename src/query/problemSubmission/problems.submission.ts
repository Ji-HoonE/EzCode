import ApiHelper from '@/api/client/api';
import { useMutation } from '@tanstack/react-query';
import {
  IProblemRequestData,
  ISubmissionReviewRequest,
  ISubmissionReviewResponse,
} from './problems.submission.interface';
import { API_URL } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';

//문제 제출하기
export const useSubmissionForResultMutation = (problemId: ProblemId) => {
  return useMutation({
    mutationFn: async (params: IProblemRequestData) => {
      const response = await ApiHelper.post<string[]>(
        `${API_URL.PROBLEM.GET_PROBLEMS}/${problemId}/submit-ws`,
        params
      );
      return response;
    },
  });
};

/** 코드리뷰 요청 뮤테이션 */
export const useISubmissionForReviewMutation = (problemId: ProblemId) => {
  return useMutation({
    mutationFn: async (params: ISubmissionReviewRequest) => {
      const response = await ApiHelper.post<ISubmissionReviewResponse>(
        `${API_URL.PROBLEM.GET_PROBLEMS}/${problemId}/review`,
        params
      );
      return response;
    },
  });
};
