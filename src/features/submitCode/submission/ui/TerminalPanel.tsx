'use client';
import { ProblemId, Icon, useAccessToken } from '@/shared';
import clsx from 'clsx';
import { Mode } from './ProblemWorksSection';
import useProblemWebSocketStore, {
  useProblemWebSocketStoreActions,
} from '../model/useProblemWebSocketStore';
import useSubscribeProblem from '../hooks/useSubscribeProblem';
import GitPushDialog from '../../gitPush/ui/GitPushDialog';
import { ISourceCode, useSubmissionForResultMutation } from '@/entities/submitCode';
import PanelButton from './PanelButton';
import { useGetSubmitPrepareData } from '@/entities/submitCode/submission/model/query/submitCode.query';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useAccessToken();
  useGetSubmitPrepareData(problemId);
  const { submitPrepareData } = useProblemWebSocketStore();

  const authGuardTrigger = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('auth-guard', 'true');
    router.push(`?${params.toString()}`);
  };

  useSubscribeProblem();

  const { mutateAsync } = useSubmissionForResultMutation(problemId);
  const { clearResults } = useProblemWebSocketStoreActions();

  const submitForResult = () => {
    if (!token) return authGuardTrigger();
    clearResults();
    mutateAsync({ ...sourceCodeData, sessionKey: submitPrepareData.sessionKey || '' });
    setMode('result');
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-[#333]">
      <div className="flex items-center space-x-2">
        <PanelButton onClick={submitForResult} currentMode={mode} targetMode="init" text="Run">
          <Icon.TerminalRunIcon
            className={clsx(mode === 'init' ? 'text-white' : 'text-[#ccc] hover:text-secondary')}
          />
        </PanelButton>
        <PanelButton
          onClick={() => setMode('result')}
          currentMode={mode}
          targetMode="result"
          text="Result"
        >
          <Icon.TerminalResultIcon
            className={clsx(mode === 'result' ? 'text-white' : 'text-[#ccc] hover:text-secondary')}
          />
        </PanelButton>
        <PanelButton
          onClick={() => setMode('review')}
          currentMode={mode}
          targetMode="review"
          text="CODE REVIEW"
        >
          <Icon.TerminalReviewIcon />
        </PanelButton>
      </div>
      <GitPushDialog githubUrl={githubUrl} />
    </div>
  );
}
