'use client';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalOutput from './TerminalOutput';
import TerminalPanel from './TerminalPanel';
import { ISourceCode } from '@/entities/submitCode';
import { useUserStore } from '@/entities/user/model/store';
import { fetchSourceCodeData, INITIAL_SOURCE_CODE_DATA } from '@/shared';
import { useGetDraftData } from '@/entities/submitCode/submission/model/query/submitCode.query';

interface IProblemWorksSectionProps {
  problemId: string;
}
export type Mode = 'init' | 'result' | 'review';

export default function ProblemWorksSection({ problemId }: IProblemWorksSectionProps) {
  const [sourceCodeData, setSourceCodeData] = useState<ISourceCode>(INITIAL_SOURCE_CODE_DATA);
  const [mode, setMode] = useState<Mode>('init');
  const [draftVersion, setDraftVersion] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const { user } = useUserStore((state) => state);
  const { data: draftData } = useGetDraftData(problemId, sourceCodeData.languageId);

  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!user) return;

    if (draftData) {
      setSourceCodeData({
        languageId: draftData.languageId,
        sourceCode: draftData.code,
      });
      setDraftVersion(draftData.version);
    } else if (!draftData && isInitialLoad) {
      setIsInitialLoad(false);
      const defaultSourceCodeData = fetchSourceCodeData(user?.language?.id as number);
      setSourceCodeData(defaultSourceCodeData);
    }
  }, [draftData, user?.language?.id]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [sourceCodeData.languageId]);
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
          draftVersion={draftVersion}
        />
        <TerminalOutput mode={mode} sourceCodeData={sourceCodeData} problemId={problemId} />
      </div>
    </section>
  );
}
