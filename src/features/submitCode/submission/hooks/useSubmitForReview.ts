import { useGetTokenCountQuery } from '@/entities/submitCode';
import { useISubmissionForReviewMutation } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation';
import { ProblemId } from '@/shared';
import useCodeReviewStore, { useCodeReviewStoreActions } from '../model/codeReviewStore';
import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import { useEffect, useState } from 'react';

export default function useSubmitForReview(problemId: ProblemId) {
  const [tokenCount, setTokenCount] = useState(0);

  /**코드리뷰를 위한 토큰 get 쿼리 */
  const { data: reviewTokenData } = useGetTokenCountQuery();

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
    if (reviewTokenData?.reviewToken) {
      setTokenCount(reviewTokenData?.reviewToken);
    }
  }, [reviewTokenData]);

  return {
    tokenCount,
    submitForReview,
    codeReview,
    isSubmittedReview,
  };
}
