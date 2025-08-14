'use client';
import { Spinner } from '@/shared/ui/loading-indicators';
import useProblemWebSocketStore from '../../model/useProblemWebSocketStore';
import ResultItem from './ResultItem';
import TotalResultBox from './TotalResultBox';

export default function CodeResultSummary() {
  const { results, totalResult, isSubmitted } = useProblemWebSocketStore();

  return (
    <div className="flex flex-col gap-4">
      {isSubmitted ? (
        <>
          <h2 className="text-lg font-bold">채점 결과</h2>
          {results && (
            <ul className="flex flex-col gap-2 p-3 rounded-xl border border-gray-600">
              {results.map((res, i) => (
                <ResultItem key={res.testcaseId} res={res} index={i} />
              ))}
            </ul>
          )}
          <div className="flex flex-col justify-between h-full">
            {totalResult ? (
              <TotalResultBox totalResult={totalResult} />
            ) : (
              <div className="flex gap-2 items-center">
                <Spinner className="size-8 text-green-900" /> 채점중 입니다
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-[#ccc] text-sm">코드를 먼저 실행해주세요</div>
      )}
    </div>
  );
}
