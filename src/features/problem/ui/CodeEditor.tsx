'use client';

import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import {
  CODEMIRROR_EXTENSIONS,
  CodeMirrorBasicSetup,
  ILanguageSelectOption,
  INITIAL_LANG,
  INITIAL_VALUE,
  LanguageSelector,
  ProblemLanguageType,
} from '@/shared';

interface ICodeEditorProps {
  onChangeSourceCodeData: (key: string, value: string | number) => void;
}

export default function CodeEditor({ onChangeSourceCodeData }: ICodeEditorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<ProblemLanguageType>(INITIAL_LANG);

  const changeSourceCodeData = (option: ILanguageSelectOption) => {
    setCurrentLanguage(option.value);
    onChangeSourceCodeData('languageId', option.id);
    onChangeSourceCodeData('sourceCode', INITIAL_VALUE[option.value as keyof typeof INITIAL_VALUE]);
  };

  return (
    <section className="flex-1 h-full">
      <LanguageSelector
        currentLanguage={currentLanguage}
        onSelect={(option) => {
          changeSourceCodeData(option);
        }}
      />
      <CodeMirror
        basicSetup={CodeMirrorBasicSetup}
        value={INITIAL_VALUE[currentLanguage as keyof typeof INITIAL_VALUE]}
        theme={'dark'}
        onChange={(value) => onChangeSourceCodeData('sourceCode', value)}
        extensions={[CODEMIRROR_EXTENSIONS[currentLanguage]]}
        aria-autocomplete="none"
        autoCapitalize="off"
        height="100%"
        className="h-[450px] overflow-scroll "
      />
    </section>
  );
}
