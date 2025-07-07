'use client';
import useConnectProblemWebSocket from '../hooks/useConnectProblemWebSocket';
import { TerminalResultIcon, TerminalReviewIcon, TerminalRunIcon } from '@/shared/ui/icons';
import useSubmissions from '../hooks/useSubmissions';
import { IProblemRequestData } from '@/query/problemSubmission/problems.submission.interface';
import useSubscribeProblem from '../hooks/useSubscribeProblem';
import { ProblemId } from '@/shared';
import clsx from 'clsx';
import { Mode } from './ProblemWorksSection';
import TerminalGitHubIcon from '@/shared/ui/icons/terminal-icons/TerminalGitHubIcon';

interface TerminalPanelProps {
  problemId: ProblemId;
  sourceCodeData: IProblemRequestData;
  setMode: (mode: Mode) => void;
  mode: Mode;
  githubUrl: string | null;
}

export default function TerminalPanel({
  problemId,
  sourceCodeData,
  setMode,
  mode,
  githubUrl,
}: TerminalPanelProps) {
  const { submitCodeForResult } = useSubmissions(problemId);
  const stompRef = useConnectProblemWebSocket();
  useSubscribeProblem(stompRef);

  return (
    <div className="flex flex-col w-[68px] px-[10px] pt-[19px]">
      <div className="flex flex-col gap-6 items-center w-full text-[10px] text-[#ffffff]">
        <button
          className="flex flex-col gap-[3px] items-center"
          onClick={() => {
            submitCodeForResult(sourceCodeData);
            setMode('result');
          }}
        >
          <TerminalRunIcon className={clsx('text-[#6B6B6B]')} />
          <h3 className={clsx('text-[#6B6B6B]')}>RUN</h3>
        </button>
        <button
          className="flex flex-col gap-2 items-center w-[30px]"
          onClick={() => setMode('result')}
        >
          <TerminalResultIcon className="text-[#00E35B]" />
          <h3 className="text-[#00E35B]">RESULT</h3>
        </button>
        <button className="flex flex-col gap-[3px] items-center" onClick={() => setMode('review')}>
          <TerminalReviewIcon className={clsx(mode !== 'review' && 'text-[#6B6B6B]')} />
          <h3 className={clsx(mode !== 'review' && 'text-[#6B6B6B]')}>REVIEW</h3>
        </button>
        <button onClick={() => {}}>
          <TerminalGitHubIcon disabled={!!githubUrl} />
        </button>
      </div>
    </div>
  );
}
