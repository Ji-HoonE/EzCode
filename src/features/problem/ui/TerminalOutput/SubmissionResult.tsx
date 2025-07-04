import { Spinner } from '@/shared/ui/loading-indicators';
import useProblemWebSocketStore from '../../model/useProblemWebSocketStore';

export default function SubmissionResult() {
  const { initCases, isSubmitted, results, finalResult } = useProblemWebSocketStore();

  if (!isSubmitted) return null;

  const accuracy = finalResult
    ? ((finalResult.passedCount / finalResult.totalCount) * 100).toFixed(2)
    : '00.00';

  return (
    <>
      <table className="text-left">
        <thead>
          <tr>
            <th>번호</th>
            <th>입력값</th>
            <th>기댓값</th>
            <th>실제 출력값</th>
            <th>실행시간</th>
            <th>메모리 사용량</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {results &&
            initCases &&
            results.map((res, index) => (
              <tr key={res.seqId}>
                <td>{res.seqId || ''}</td>
                <td>{initCases[index] ? initCases[index].input : ''}</td>
                <td>{initCases[index] ? initCases[index].output : ''}</td>
                <td>{res.actualOutput || ''}</td>
                <td>{res.executionTime || ''}ms</td>
                <td>{res.memoryUsage || ''}KB</td>
                <td>v</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex flex-col justify-between h-full">
        {finalResult ? (
          <div className="bg-[#363636] w-full h-[70px] rounded-[10px] flex  items-center justify-center">
            <p className="text-[22px]">
              최종 : {finalResult.passedCount}/{finalResult.totalCount} 정답 (
              <span className="text-[#FFCFA7]">{finalResult.isCorrect ? '통과' : '실패'}</span>) |
              정답률 {accuracy}%, ({finalResult.passedCount}개 정답/
              {finalResult.totalCount}개 문제중)
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
