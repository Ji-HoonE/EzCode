'use client';
import useProblemWebSocketStore from '@/features/submitCode/submission/model/useProblemWebSocketStore';
import { useEffect } from 'react';
import CodeResultSummary from './CodeResultSummary';
import CodeReviewSummary from './CodeReviewSummary';
import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import { useCodeReviewStoreActions } from '../../model/codeReviewStore';
import { Mode } from '../ProblemWorksSection';

interface ITerminalOutputProps {
  mode: Mode;
  sourceCodeData: ISourceCode;
  problemId: string;
}
export default function TerminalOutput({ mode, sourceCodeData, problemId }: ITerminalOutputProps) {
  const { totalResult } = useProblemWebSocketStore();

  const { setIsCorrect } = useCodeReviewStoreActions();

  useEffect(() => {
    if (totalResult) {
      setIsCorrect(totalResult?.isCorrect || false);
    }
  }, [totalResult, setIsCorrect]);

  return (
    <section className="flex flex-col w-full h-full px-[14px] py-[22px] overflow-y-scroll">
      {mode === 'result' ? (
        <CodeResultSummary />
      ) : mode === 'review' ? (
        <CodeReviewSummary problemId={problemId} sourceCodeData={sourceCodeData} />
      ) : (
        <div className="text-[#ccc] text-sm">코드를 먼저 실행해주세요</div>
      )}
    </section>
  );
}
