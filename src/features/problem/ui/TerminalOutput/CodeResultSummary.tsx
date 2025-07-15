import { Spinner } from '@/shared/ui/loading-indicators';
import useProblemWebSocketStore from '../../model/useProblemWebSocketStore';
import ResultStatusIcon from '@/shared/ui/icons/terminal-icons/ResultStatusIcon';

export default function CodeResultSummary() {
  const { results, totalResult } = useProblemWebSocketStore();

  const accuracy = totalResult
    ? ((totalResult.passedCount / totalResult.totalCount) * 100).toFixed(2)
    : '00.00';

  return (
    <>
      <table className="text-left">
        <thead>
          <tr>
            <th>번호</th>
            <th>실제 출력값</th>
            <th>실행시간</th>
            <th>메모리 사용량</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {results &&
            results.map((res, index) => (
              <tr key={res.testcaseId}>
                <td>{index + 1}</td>
                <td>{res.actualOutput}</td>
                <td>{res.executionTime}ms</td>
                <td>{res.memoryUsage}KB</td>
                <td>
                  <ResultStatusIcon status={res.isPassed} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex flex-col justify-between h-full">
        {totalResult ? (
          <div className="bg-[#363636] w-full h-[70px] rounded-[10px] flex  items-center justify-center">
            <p className="text-[22px]">
              최종 : {totalResult.passedCount}/{totalResult.totalCount} 정답 (
              <span className="text-[#FFCFA7]">{totalResult.isCorrect ? '통과' : '실패'}</span>) |
              정답률 {accuracy}%, ({totalResult.passedCount}개 정답/
              {totalResult.totalCount}개 문제중)
            </p>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Spinner className="size-8 text-green-900" /> 채점중 입니다
          </div>
        )}
      </div>
    </>
  );
}
