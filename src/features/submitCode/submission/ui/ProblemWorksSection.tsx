'use client';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalOutput from './TerminalOutput';
import TerminalPanel from './TerminalPanel';
import { ISourceCode } from '@/entities/submitCode';
import { useUserStore } from '@/entities/user/model/store';
import { fetchSourceCodeData, INITIAL_SOURCE_CODE_DATA } from '@/shared';

interface IProblemWorksSectionProps {
  problemId: string;
  githubUrl: string | null;
}
export type Mode = 'init' | 'result' | 'review';

export default function ProblemWorksSection({ problemId, githubUrl }: IProblemWorksSectionProps) {
  const [sourceCodeData, setSourceCodeData] = useState<ISourceCode>(INITIAL_SOURCE_CODE_DATA);
  const [mode, setMode] = useState<Mode>('init');
  const { user } = useUserStore((state) => state);

  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!user) return;

    const fetchedSourceCodeData = fetchSourceCodeData(user?.language?.id as number);
    setSourceCodeData(fetchedSourceCodeData);
  }, [user?.language]);

  return (
    <section className="flex flex-col gap-5 h-full">
      <CodeEditor
        onChangeSourceCodeData={handleChangeSourceCodeData}
        languageId={sourceCodeData.languageId}
      />
      <div className="flex flex-1 flex-col bg-secondary-background rounded-[10px] shadow-lg ">
        <TerminalPanel
          problemId={problemId}
          sourceCodeData={sourceCodeData}
          setMode={(mode) => setMode(mode)}
          mode={mode}
          githubUrl={githubUrl}
        />
        <TerminalOutput mode={mode} sourceCodeData={sourceCodeData} problemId={problemId} />
      </div>
    </section>
  );
}
