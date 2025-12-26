'use client';

import CodeMirror from '@uiw/react-codemirror';
import {
  CODEMIRROR_EXTENSIONS,
  CodeMirrorBasicSetup,
  LANGUAGE_SELECTOR_OPTIONS,
  SOURCECODE,
} from '@/shared';
import { Select } from '@/shared/ui/select/Select';
import { ISourceCode } from '@/entities/submitCode';

interface ICodeEditorProps {
  onChangeSourceCodeData: (key: 'sourceCode' | 'languageId', value: number | string) => void;
  sourceCodeData: ISourceCode;
  problemId: string;
}
export default function CodeEditor({ onChangeSourceCodeData, sourceCodeData }: ICodeEditorProps) {
  const { languageId } = sourceCodeData;

  const handleChangeLanguage = (value: string) => {
    const languageId = Number(value);
    onChangeSourceCodeData('languageId', languageId);
    onChangeSourceCodeData('sourceCode', SOURCECODE[languageId]);
  };

  const handleChangeCode = (value: string) => {
    onChangeSourceCodeData('sourceCode', value);
  };

  return (
    <section className="flex-1 flex flex-col h-full gap-4">
      <Select
        title="언어 선택"
        value={String(languageId)}
        option={LANGUAGE_SELECTOR_OPTIONS}
        setValue={(value) => handleChangeLanguage(value)}
      />

      <CodeMirror
        basicSetup={CodeMirrorBasicSetup}
        value={sourceCodeData.sourceCode}
        theme={'dark'}
        onChange={(value) => handleChangeCode(value)}
        extensions={[CODEMIRROR_EXTENSIONS[languageId]]}
        aria-autocomplete="none"
        autoCapitalize="off"
        height="100%"
        className="h-full overflow-y-scroll text-lg"
      />
    </section>
  );
}
