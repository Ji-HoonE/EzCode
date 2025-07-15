'use client';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import {
  IProblemRequestData,
  ISubmissionReviewRequest,
} from '@/query/problemSubmission/problems.submission.interface';
import { ProblemId } from '@/shared';
import {
  useISubmissionForReviewMutation,
  useSubmissionForResultMutation,
} from '@/query/problemSubmission/problems.submission';
import { useProblemWebSocketStoreActions } from '../model/useProblemWebSocketStore';
import { useCodeReviewStoreActions } from '../model/codeReviewStore';

export default function useSubmissions(problemId: ProblemId) {
  const { setSessionKey } = useProblemWebSocketStoreActions();
  const { setCodeReviewContent, setIsSubmittedReview } = useCodeReviewStoreActions();

  const { mutateAsync: submissionForResultMutate, isPending: resultPending } =
    useSubmissionForResultMutation(problemId);
  const { mutateAsync: submissionForReviewMutate } = useISubmissionForReviewMutation(problemId);

  /** 코드제출후 세션키를 받는 함수,이후 웹소켓으로 연결됨 */
  const submitCodeForResult = async (sourceCodeData: IProblemRequestData) => {
    try {
      const response = await submissionForResultMutate(sourceCodeData);

      if (response.data.status === API_CONSTANTS.CODE.OK) {
        setSessionKey(response.data.result[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /** 코드리뷰 응답을 위한 함수 */
  const submitCodeForReview = async (sourceCodeDataForReview: ISubmissionReviewRequest) => {
    try {
      const response = await submissionForReviewMutate(sourceCodeDataForReview);
      if (response.data.status === API_CONSTANTS.CODE.OK) {
        setIsSubmittedReview(true);
        setCodeReviewContent(response.data.result.reviewContent);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    resultPending,
    submitCodeForResult,
    submitCodeForReview,
  };
}
