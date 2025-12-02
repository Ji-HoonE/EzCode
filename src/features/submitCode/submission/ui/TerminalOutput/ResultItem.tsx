import clsx from 'clsx';
import { IProblemStompResult } from '../../model/useProblemWebSocketStore.types';

interface ResultItemProps {
  res: IProblemStompResult;
  index: number;
}

export default function ResultItem({ res, index }: ResultItemProps) {
  const { isPassed, executionTime, memoryUsage, message } = res;

  const resultMessage = message !== 'Accepted' ? message : isPassed ? 'Success' : 'Fail';
  return (
    <div
      className={clsx(
        'flex p-1.5 border-[1px] rounded-lg text-gray-300 text-sm',
        isPassed ? 'border-secondary/30 bg-secondary/20' : 'border-red-600/30 bg-red-600/20'
      )}
    >
      <p>
        [ {index + 1} ] {resultMessage} ({executionTime}ms, {memoryUsage}KB)
      </p>
    </div>
  );
}
