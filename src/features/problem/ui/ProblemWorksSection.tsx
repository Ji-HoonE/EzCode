'use client';
import { useState } from 'react';
import CodeEditor from './CodeEditor';
import TerminalOutput from './TerminalOutput';
import { INITIAL_SOURCE_CODE_DATA } from '@/shared/lib/codemirror/codeMirror.Docs';
import TerminalPanel from './TerminalPanel';
import { IProblemRequestData } from '@/query/problemSubmission/problems.submission.interface';

interface IProblemWorksSectionProps {
  problemId: string;
}

export default function ProblemWorksSection({ problemId }: IProblemWorksSectionProps) {
  const [sourceCodeData, setSourceCodeData] =
    useState<IProblemRequestData>(INITIAL_SOURCE_CODE_DATA);

  const handleChangeSourceCodeData = (key: string, value: string | number | boolean) => {
    setSourceCodeData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="flex flex-col flex-1">
      <CodeEditor onChangeSourceCodeData={handleChangeSourceCodeData} />
      <div className="h-[1px] w-full bg-white" />
      <div className="flex flex-1">
        <TerminalOutput />
        <TerminalPanel problemId={problemId} sourceCodeData={sourceCodeData} />
      </div>
    </section>
  );
}
