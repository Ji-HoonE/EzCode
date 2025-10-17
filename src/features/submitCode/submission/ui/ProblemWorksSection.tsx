'use client';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalOutput from './TerminalOutput';
import TerminalPanel from './TerminalPanel';
import { ISourceCode } from '@/entities/submitCode';
import { useUserStore } from '@/entities/user/model/store';
import { fetchSourceCodeData, INITIAL_SOURCE_CODE_DATA, SOURCECODE } from '@/shared';

interface IProblemWorksSectionProps {
  problemId: string;
}
export type Mode = 'init' | 'result' | 'review';

export default function ProblemWorksSection({ problemId }: IProblemWorksSectionProps) {
  const [sourceCodeData, setSourceCodeData] = useState<ISourceCode>(INITIAL_SOURCE_CODE_DATA);
  const [mode, setMode] = useState<Mode>('init');
  const { user } = useUserStore((state) => state);

  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!user) return;
    const storedData = localStorage.getItem(`sourceCodeData-${problemId}`);

    const fetchedSourceCodeData = fetchSourceCodeData(user?.language?.id as number);
    if (
      storedData &&
      JSON.parse(storedData).sourceCode !== SOURCECODE[JSON.parse(storedData).languageId]
    )
      return;
    setSourceCodeData(fetchedSourceCodeData);
  }, [user?.language, user]);

  useEffect(() => {
    const storedData = localStorage.getItem(`sourceCodeData-${problemId}`);

    setSourceCodeData(
      storedData ? (JSON.parse(storedData) as ISourceCode) : INITIAL_SOURCE_CODE_DATA
    );
    if (!storedData) {
      localStorage.setItem(`sourceCodeData-${problemId}`, JSON.stringify(sourceCodeData));
    }
  }, [problemId]);

  return (
    <section className="flex flex-col gap-5 h-full">
      <CodeEditor
        problemId={problemId}
        sourceCodeData={sourceCodeData}
        onChangeSourceCodeData={handleChangeSourceCodeData}
      />
      <div className="flex flex-1 flex-col bg-secondary-background rounded-[10px] shadow-lg ">
        <TerminalPanel
          problemId={problemId}
          sourceCodeData={sourceCodeData}
          setMode={(mode) => setMode(mode)}
          mode={mode}
        />
        <TerminalOutput mode={mode} sourceCodeData={sourceCodeData} problemId={problemId} />
      </div>
    </section>
  );
}
