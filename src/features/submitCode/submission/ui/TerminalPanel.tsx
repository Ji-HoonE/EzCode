'use client';
import { ProblemId, Icon } from '@/shared';
import clsx from 'clsx';
import { Mode } from './ProblemWorksSection';
import useProblemWebSocketStore, {
  useProblemWebSocketStoreActions,
} from '../model/useProblemWebSocketStore';
import GitPushDialog from '../../gitPush/ui/GitPushDialog';
import { ISourceCode, useSubmissionForResultMutation } from '@/entities/submitCode';
import PanelButton from './PanelButton';
import { useGetSubmitPrepareData } from '@/entities/submitCode/submission/model/query/submitCode.query';
import { useRouter, useSearchParams } from 'next/navigation';
import useSubscribeProblem from '../hooks/useSubscribeProblem';
import Cookies from 'js-cookie';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUserStore } from '@/entities/user/model/store';
import { useState } from 'react';
import { useSaveDraftData } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation';
import handleUnsavedSourceCode from '../util/handleUnsavedSourceCode';
interface TerminalPanelProps {
  problemId: ProblemId;
  setMode: (mode: Mode) => void;
  mode: Mode;
  sourceCodeData: ISourceCode;
  draftVersion: number;
  setDraftVersion: (version: number) => void;
}

export default function TerminalPanel({
  problemId,
  setMode,
  mode,
  sourceCodeData,
  draftVersion,
  setDraftVersion,
}: TerminalPanelProps) {
  const [isPanelButtonHovered, setIsPanelButtonHovered] = useState({
    review: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = Cookies.get('accessToken');
  const { user } = useUserStore();
  useGetSubmitPrepareData(problemId, !!accessToken);
  const { submitPrepareData } = useProblemWebSocketStore();
  const { mutateAsync: saveDraft } = useSaveDraftData(!!accessToken);

  const authGuardTrigger = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('auth-guard', 'true');
    router.push(`?${params.toString()}`);
  };
  useSubscribeProblem();
  const { mutateAsync } = useSubmissionForResultMutation(problemId);
  const { clearResults } = useProblemWebSocketStoreActions();

  const [_, setUnsavedSourceCode] = handleUnsavedSourceCode();

  const submitForResult = () => {
    if (!accessToken) {
      setUnsavedSourceCode({
        problemId: problemId,
        sourceCode: sourceCodeData.sourceCode,
        languageId: sourceCodeData.languageId,
      });

      authGuardTrigger();
      return;
    }
    const newVersion = saveDraft({
      problemId: Number(problemId),
      languageId: sourceCodeData.languageId,
      code: sourceCodeData.sourceCode,
      version: draftVersion,
    });
    if (typeof newVersion === 'number') {
      setDraftVersion(newVersion);
    }
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

        <Tooltip open={!user?.verified && isPanelButtonHovered.review}>
          <TooltipTrigger asChild>
            <div
              onMouseEnter={() => setIsPanelButtonHovered((prev) => ({ ...prev, review: true }))}
              onMouseLeave={() => setIsPanelButtonHovered((prev) => ({ ...prev, review: false }))}
            >
              <PanelButton
                onClick={() => setMode('review')}
                currentMode={mode}
                targetMode="review"
                text="CODE REVIEW"
                disabled={!user?.verified}
              >
                <Icon.TerminalReviewIcon />
              </PanelButton>
            </div>
          </TooltipTrigger>
          <TooltipContent>이메일 인증 완료 후 이용 가능합니다</TooltipContent>
        </Tooltip>
      </div>
      <GitPushDialog />
    </div>
  );
}
