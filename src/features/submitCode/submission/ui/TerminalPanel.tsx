'use client';
import { TerminalResultIcon, TerminalReviewIcon, TerminalRunIcon } from '@/shared/ui/icons';
import { ProblemId } from '@/shared';
import clsx from 'clsx';
import { useSubmissionForResultMutationT } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation';
import { Mode } from './ProblemWorksSection';
import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import useProblemWebSocketStore, {
  useProblemWebSocketStoreActions,
} from '../model/useProblemWebSocketStore';
import useSubscribeProblem from '../hooks/useSubscribeProblem';
import GitPushDialog from '../../gitPush/ui/GitPushDialog';

interface TerminalPanelProps {
  problemId: ProblemId;
  setMode: (mode: Mode) => void;
  mode: Mode;
  githubUrl: string | null;
  sourceCodeData: ISourceCode;
}

export default function TerminalPanel({
  problemId,
  setMode,
  mode,
  githubUrl,
  sourceCodeData,
}: TerminalPanelProps) {
  const { sessionKey } = useProblemWebSocketStore();

  useSubscribeProblem(sessionKey);

  const { mutateAsync } = useSubmissionForResultMutationT(problemId);
  const { clearResults } = useProblemWebSocketStoreActions();

  return (
    <div className="flex flex-col w-[68px] px-[10px] pt-[19px]">
      <div className="flex flex-col gap-6 items-center w-full text-[10px] text-[#ffffff]">
        <button
          className="flex flex-col gap-[3px] items-center"
          onClick={() => {
            clearResults();
            mutateAsync({ ...sourceCodeData, sessionKey: sessionKey || '' });
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
        <GitPushDialog githubUrl={githubUrl} />
      </div>
    </div>
  );
}
