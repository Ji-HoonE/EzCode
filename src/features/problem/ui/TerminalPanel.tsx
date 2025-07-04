'use client';
import useConnectProblemWebSocket from '../hooks/useConnectProblemWebSocket';
import { TerminalResultIcon, TerminalReviewIcon, TerminalRunIcon } from '@/shared/ui/icons';
import useSubmissions from '../hooks/useSubmissions';
import { IProblemRequestData } from '@/query/problemSubmission/problems.submission.interface';
import useSubscribeProblem from '../hooks/useSubscribeProblem';
import useCodeReviewStore from '../model/codeReviewStore';

interface TerminalPanelProps {
  problemId: string;
  sourceCodeData: IProblemRequestData;
}

export default function TerminalPanel({ problemId, sourceCodeData }: TerminalPanelProps) {
  const { resultPending, submitCodeForResult, submitCodeForReview } = useSubmissions(problemId);
  const { isCorrect } = useCodeReviewStore();
  const stompRef = useConnectProblemWebSocket();
  useSubscribeProblem(stompRef);

  return (
    <div className="flex flex-col w-[68px] px-[10px] pt-[19px]">
      <div className="flex flex-col gap-6 items-center w-full">
        <button
          className="flex flex-col gap-[3px] items-center"
          onClick={() => submitCodeForResult(sourceCodeData)}
          disabled={resultPending}
        >
          <TerminalRunIcon className="text-[#ffffff]" />
          <h3 className="text-[10px]">RUN</h3>
        </button>
        <div className="flex flex-col gap-2 items-center w-[30px]">
          <TerminalResultIcon className="text-[#00E35B]" />
          <h3 className="text-[10px]">RESULT</h3>
        </div>
        <button
          className="flex flex-col gap-[3px] items-center"
          onClick={() => submitCodeForReview({ isCorrect, ...sourceCodeData })}
        >
          <TerminalReviewIcon className="text-[#6B6B6B]" />
          <h3 className="text-[10px]">REVIEW</h3>
        </button>
      </div>
    </div>
  );
}
