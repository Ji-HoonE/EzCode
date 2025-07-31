'use client';
import { ProblemId, Icon } from '@/shared';
import clsx from 'clsx';
import { Mode } from './ProblemWorksSection';
import useProblemWebSocketStore, {
  useProblemWebSocketStoreActions,
} from '../model/useProblemWebSocketStore';
import useSubscribeProblem from '../hooks/useSubscribeProblem';
import GitPushDialog from '../../gitPush/ui/GitPushDialog';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/api/constants/api.constants';
import { ISourceCode, useSubmissionForResultMutation } from '@/entities/submitCode';
import PanelButton from './PanelButton';

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
  const router = useRouter();

  useSubscribeProblem(sessionKey);

  const { mutateAsync } = useSubmissionForResultMutation(problemId);
  const { clearResults } = useProblemWebSocketStoreActions();
  const { token } = useProblemWebSocketStore();

  const submitForResult = () => {
    if (!token) return router.push(API_URL.AUTH.SIGN_IN);
    clearResults();
    mutateAsync({ ...sourceCodeData, sessionKey: sessionKey || '' });
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
