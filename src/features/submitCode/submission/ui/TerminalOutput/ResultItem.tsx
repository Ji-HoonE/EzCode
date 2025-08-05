import clsx from 'clsx';
import { IProblemStompResult } from '../../model/useProblemWebSocketStore.types';

interface ResultItemProps {
  res: IProblemStompResult;
  index: number;
}

export default function ResultItem({ res, index }: ResultItemProps) {
  const { isPassed, executionTime, memoryUsage, message } = res;

  return (
    <div
      className={clsx(
        'flex py-2 px-2 border-[1px] rounded-xl',
        isPassed ? 'border-secondary/30 bg-secondary/20' : 'border-red-600/30 bg-red-600/20'
      )}
    >
      <p className={clsx(isPassed ? 'text-secondary/80' : 'text-red-600/80')}>
        case {index + 1} : {message} {executionTime}ms {memoryUsage}KB
      </p>
    </div>
  );
}
