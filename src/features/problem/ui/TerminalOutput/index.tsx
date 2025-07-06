'use client';
import useProblemWebSocketStore from '@/features/problem/model/useProblemWebSocketStore';
import { useCodeReviewStoreActions } from '../../model/codeReviewStore';
import { useEffect } from 'react';
import { Mode } from '../ProblemWorksSection';
import CodeResultSummary from './CodeResultSummary';
import CodeReviewSummary from './CodeReviewSummary';
import { IProblemRequestData } from '@/query/problemSubmission/problems.submission.interface';

interface ITerminalOutputProps {
  mode: Mode;
  sourceCodeData: IProblemRequestData;
}
export default function TerminalOutput({ mode, sourceCodeData }: ITerminalOutputProps) {
  const { finalResult } = useProblemWebSocketStore();

  const { setIsCorrect } = useCodeReviewStoreActions();

  useEffect(() => {
    if (finalResult) {
      setIsCorrect(finalResult?.isCorrect || false);
    }
  }, [finalResult]);

  return (
    <section className="flex flex-col w-full px-[14px] py-[22px]">
      {mode === 'result' ? (
        <CodeResultSummary />
      ) : mode === 'review' ? (
        <CodeReviewSummary problemId="1" sourceCodeData={sourceCodeData} />
      ) : (
        <p>코드제출을 먼저 실행 해주세요</p>
      )}
    </section>
  );
}
