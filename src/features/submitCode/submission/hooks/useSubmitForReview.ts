import { ProblemId } from '@/shared';
import useCodeReviewStore, { useCodeReviewStoreActions } from '../model/codeReviewStore';
import { useEffect, useState } from 'react';
import { useMyAiReviewCheckQuery } from '@/entities/mypage/model/query';
import { ISourceCode, useISubmissionForReviewMutation } from '@/entities/submitCode';

export default function useSubmitForReview(problemId: ProblemId) {
  const [tokenCount, setTokenCount] = useState(0);

  /**코드리뷰를 위한 토큰 get 쿼리 */
  const { data: reviewTokenData } = useMyAiReviewCheckQuery();

  /**코드리뷰 요청 뮤테이션 */
  const { mutateAsync, data: codeReview } = useISubmissionForReviewMutation(problemId);

  /**다 맞추었을때, isCorrect 상태를 담은 store*/
  const { isCorrect, isSubmittedReview } = useCodeReviewStore();
  const { setIsSubmittedReview } = useCodeReviewStoreActions();

  const submitForReview = (sourceCodeData: ISourceCode) => {
    mutateAsync({ ...sourceCodeData, isCorrect: isCorrect });
    setIsSubmittedReview(true);
    setTokenCount((prev) => prev - 1);
  };

  useEffect(() => {
    if (reviewTokenData?.data.result.reviewToken) {
      setTokenCount(reviewTokenData?.data.result.reviewToken);
    }
  }, [reviewTokenData]);

  return {
    tokenCount,
    submitForReview,
    codeReview,
    isSubmittedReview,
  };
}
