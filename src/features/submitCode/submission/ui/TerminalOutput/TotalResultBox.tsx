import { cn } from '@/lib/utils';
import { IProblemStompFinalResult } from '../../model/useProblemWebSocketStore.types';

interface ITotalResultBoxProps {
  totalResult: IProblemStompFinalResult;
}

export default function TotalResultBox({ totalResult }: ITotalResultBoxProps) {
  const { totalCount, passedCount, isCorrect } = totalResult;
  const accuracy = totalResult
    ? ((totalResult.passedCount / totalResult.totalCount) * 100).toFixed(2)
    : '00.00';

  const totalResultText = isCorrect ? '통과' : '실패';

  return (
    <div
      className={cn(
        'bg-background w-full h-18 rounded-xl flex items-center justify-center  border-[2px] gap-1',
        isCorrect ? 'border-secondary' : 'border-danger'
      )}
    >
      최종 테스트
      <strong className={isCorrect ? 'text-secondary' : 'text-red-600'}>{totalResultText}</strong>
      <p>
        | 통과율 {accuracy}%, ({passedCount}/{totalCount})
      </p>
    </div>
  );
}
