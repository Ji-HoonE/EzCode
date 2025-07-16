'use client';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import { INITIAL_SOURCE_CODE_DATA } from '@/shared/lib/codemirror/codeMirror.Docs';
import { useProblemWebSocketStoreActions } from '../model/useProblemWebSocketStore';
import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import TerminalOutput from './TerminalOutput';
import TerminalPanel from './TerminalPanel';
import useAccessToken from '@/entities/auth/hooks/useAuthToken';

interface IProblemWorksSectionProps {
  problemId: string;
  githubUrl: string | null;
  sessionKey: string | undefined;
}
export type Mode = 'init' | 'result' | 'review';

export default function ProblemWorksSection({
  problemId,
  githubUrl,
  sessionKey,
}: IProblemWorksSectionProps) {
  const [sourceCodeData, setSourceCodeData] = useState<ISourceCode>(INITIAL_SOURCE_CODE_DATA);
  const [mode, setMode] = useState<Mode>('init');

  const { setAuth } = useProblemWebSocketStoreActions();
  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  const accessToken = useAccessToken();

  useEffect(() => {
    if (sessionKey) {
      setAuth('sessionKey', sessionKey);
    }
    if (accessToken) {
      setAuth('token', accessToken);
    }
  }, [sessionKey, accessToken]);

  return (
    <section className="flex flex-col">
      <CodeEditor onChangeSourceCodeData={handleChangeSourceCodeData} />
      <div className="h-[1px] w-full bg-white" />
      <div className="flex flex-1">
        <>
          <TerminalOutput mode={mode} sourceCodeData={sourceCodeData} />
          <TerminalPanel
            problemId={problemId}
            sourceCodeData={sourceCodeData}
            setMode={(mode) => setMode(mode)}
            mode={mode}
            githubUrl={githubUrl}
          />
        </>
      </div>
    </section>
  );
}
