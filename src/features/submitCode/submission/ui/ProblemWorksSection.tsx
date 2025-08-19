'use client';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import { useProblemWebSocketStoreActions } from '../model/useProblemWebSocketStore';
import TerminalOutput from './TerminalOutput';
import TerminalPanel from './TerminalPanel';
import { INITIAL_SOURCE_CODE_DATA, useAccessToken } from '@/shared';
import { ISourceCode } from '@/entities/submitCode';
import { ISubmitPrepareData } from '@/entities/problem/api/server/getSubmitPrepareData.type';

interface IProblemWorksSectionProps {
  problemId: string;
  githubUrl: string | null;
  submitPrepareData: ISubmitPrepareData | undefined;
}
export type Mode = 'init' | 'result' | 'review';

export default function ProblemWorksSection({
  problemId,
  githubUrl,
  submitPrepareData,
}: IProblemWorksSectionProps) {
  const [sourceCodeData, setSourceCodeData] = useState<ISourceCode>(INITIAL_SOURCE_CODE_DATA);
  const [mode, setMode] = useState<Mode>('init');

  const { setAuth, setTestCaseIds } = useProblemWebSocketStoreActions();
  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  const accessToken = useAccessToken();

  useEffect(() => {
    if (submitPrepareData?.sessionKey) {
      setAuth('sessionKey', submitPrepareData.sessionKey);
      setTestCaseIds(submitPrepareData.testcaseIds);
    }
    if (accessToken) {
      setAuth('token', accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitPrepareData, accessToken]);

  return (
    <section className="flex flex-col gap-5 h-full">
      <CodeEditor onChangeSourceCodeData={handleChangeSourceCodeData} />
      <div className="flex flex-1 flex-col bg-secondary-background rounded-[10px] shadow-lg ">
        <TerminalPanel
          problemId={problemId}
          sourceCodeData={sourceCodeData}
          setMode={(mode) => setMode(mode)}
          mode={mode}
          githubUrl={githubUrl}
        />
        <TerminalOutput mode={mode} sourceCodeData={sourceCodeData} />
      </div>
    </section>
  );
}
