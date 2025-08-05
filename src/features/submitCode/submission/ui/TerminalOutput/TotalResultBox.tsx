import { IProblemStompFinalResult } from '../../model/useProblemWebSocketStore.types';

interface ITotalResultBoxProps {
  totalResult: IProblemStompFinalResult;
}

export default function TotalResultBox({ totalResult }: ITotalResultBoxProps) {
  const { totalCount, passedCount, isCorrect } = totalResult;
  const accuracy = totalResult
    ? ((totalResult.passedCount / totalResult.totalCount) * 100).toFixed(2)
    : '00.00';

  const totalResultText = isCorrect ? ' 통과 ' : ' 실패 ';

  return (
    <div className="bg-background w-full text-5 h-[70px] rounded-[10px] flex  items-center justify-center">
      최종 테스트
      <span className={isCorrect ? 'text-secondary' : 'text-red-600'}>{totalResultText}</span>|
      통과율 {accuracy}%, ({passedCount}/{totalCount})
    </div>
  );
}
