'use client';
import { Spinner } from '@/shared/ui/loading-indicators';
import useProblemWebSocketStore from '@/features/problem/model/useProblemWebSocketStore';
import useCodeReviewStore, { useCodeReviewStoreActions } from '../../model/codeReviewStore';
import SubmissionResult from './SubmissionResult';

export default function TerminalOutput() {
  const { isSubmitted, finalResult } = useProblemWebSocketStore();

  const { isSubmittedReview, codeReviewContent } = useCodeReviewStore();
  const { setIsCorrect } = useCodeReviewStoreActions();

  setIsCorrect(finalResult?.isCorrect || false);

  return (
    <section className="flex flex-col w-full px-[14px] py-[22px]">
      {isSubmitted ? <SubmissionResult /> : <p>코드제출을 먼저 실행 해주세요</p>}
      <p>코드리뷰 {codeReviewContent || '코드리뷰 없음 '}</p>
    </section>
  );
}
