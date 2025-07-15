'use client';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalOutput from './TerminalOutput';
import { INITIAL_SOURCE_CODE_DATA } from '@/shared/lib/codemirror/codeMirror.Docs';
import TerminalPanel from './TerminalPanel';
import { IProblemRequestData } from '@/query/problemSubmission/problems.submission.interface';
import { useProblemWebSocketStoreActions } from '../model/useProblemWebSocketStore';

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
  const [sourceCodeData, setSourceCodeData] =
    useState<IProblemRequestData>(INITIAL_SOURCE_CODE_DATA);
  const [mode, setMode] = useState<Mode>('init');

  const { setSessionKey } = useProblemWebSocketStoreActions();
  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (sessionKey) {
      setSessionKey(sessionKey);
    }
  }, [sessionKey]);

  return (
    <section className="flex flex-col">
      <CodeEditor onChangeSourceCodeData={handleChangeSourceCodeData} />
      <div className="h-[1px] w-full bg-white" />
      <div className="flex flex-1">
        <TerminalOutput mode={mode} sourceCodeData={sourceCodeData} />
        <TerminalPanel
          problemId={problemId}
          sourceCodeData={sourceCodeData}
          setMode={(mode) => setMode(mode)}
          mode={mode}
          githubUrl={githubUrl}
        />
      </div>
    </section>
  );
}
