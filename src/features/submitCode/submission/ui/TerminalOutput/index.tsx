'use client';
import useProblemWebSocketStore from '@/features/submitCode/submission/model/useProblemWebSocketStore';
import { useEffect } from 'react';
import CodeResultSummary from './CodeResultSummary';
import CodeReviewSummary from './CodeReviewSummary';
import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import { Mode } from 'fs';
import { useCodeReviewStoreActions } from '../../model/codeReviewStore';

interface ITerminalOutputProps {
  mode: Mode;
  sourceCodeData: ISourceCode;
}
export default function TerminalOutput({ mode, sourceCodeData }: ITerminalOutputProps) {
  const { totalResult } = useProblemWebSocketStore();

  const { setIsCorrect } = useCodeReviewStoreActions();

  useEffect(() => {
    if (totalResult) {
      setIsCorrect(totalResult?.isCorrect || false);
    }
  }, [totalResult, setIsCorrect]);

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
