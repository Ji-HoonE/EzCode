'use client';
import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalOutput from './TerminalOutput';
import TerminalPanel from './TerminalPanel';
import { ISourceCode } from '@/entities/submitCode';
import { useUserStore } from '@/entities/user/model/store';
import { fetchSourceCodeData, INITIAL_SOURCE_CODE_DATA } from '@/shared';
import { useGetDraftData } from '@/entities/submitCode/submission/model/query/submitCode.query';
import handleUnsavedSourceCode from '../util/handleUnsavedSourceCode';

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
  const [unsavedSourceCode] = handleUnsavedSourceCode();

  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!user) return;

    if (unsavedSourceCode && unsavedSourceCode.problemId === problemId) {
      setSourceCodeData({
        languageId: unsavedSourceCode.languageId,
        sourceCode: unsavedSourceCode.sourceCode,
      });
    } else {
      const targetLanguageId = isInitialLoad
        ? (user?.language?.id as number) // 초기 로드: 사용자 선호도 언어
        : sourceCodeData.languageId; // 언어 변경: 선택된 언어

      // 해당 언어의 draft 데이터 확인
      if (draftData && draftData.languageId === targetLanguageId) {
        // Draft 데이터가 있고, 언어가 일치하면 사용
        setSourceCodeData({
          languageId: draftData.languageId,
          sourceCode: draftData.code,
        });
        setDraftVersion(draftData.version);
      } else {
        // Draft가 없으면 해당 언어의 템플릿 코드 사용
        const templateData = fetchSourceCodeData(targetLanguageId);
        setSourceCodeData(templateData);
        setDraftVersion(0);
      }
    }
    // 초기 로드 완료 처리
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [draftData, user?.language?.id, sourceCodeData.languageId, isInitialLoad]);

  const handleChangeDraftVersion = (version: number) => {
    setDraftVersion(version);
  };

  return (
    <section className="flex flex-col gap-5 h-full">
      <CodeEditor
        problemId={problemId}
        sourceCodeData={sourceCodeData}
        onChangeSourceCodeData={handleChangeSourceCodeData}
        draftVersion={draftVersion}
        setDraftVersion={handleChangeDraftVersion}
      />
      <div className="flex flex-1 flex-col bg-secondary-background rounded-[10px] shadow-lg ">
        <TerminalPanel
          problemId={problemId}
          sourceCodeData={sourceCodeData}
          setMode={(mode) => setMode(mode)}
          mode={mode}
          draftVersion={draftVersion}
          setDraftVersion={handleChangeDraftVersion}
        />
        <TerminalOutput mode={mode} sourceCodeData={sourceCodeData} problemId={problemId} />
      </div>
    </section>
  );
}
