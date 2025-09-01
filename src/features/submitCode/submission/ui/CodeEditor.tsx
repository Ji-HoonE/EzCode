'use client';

import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import {
  CODEMIRROR_EXTENSIONS,
  CodeMirrorBasicSetup,
  INITIAL_LANG,
  INITIAL_VALUE,
  ProblemLanguageType,
} from '@/shared';
import { OptionType, Select } from '@/shared/ui/select/Select';
import { LANGUAGE_ID } from '@/shared/types/problem.type';
import { LANGUAGE_SELECTOR_OPTIONS } from '@/shared/lib/codemirror';
import { useUserStore } from '@/entities/user/model/store';

interface ICodeEditorProps {
  onChangeSourceCodeData: (key: string, value: string | number) => void;
}

export default function CodeEditor({ onChangeSourceCodeData }: ICodeEditorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<ProblemLanguageType>(INITIAL_LANG);

  const typedOptions = LANGUAGE_SELECTOR_OPTIONS as OptionType[];
  const changeSourceCodeData = (value: string) => {
    const typedValue = value as ProblemLanguageType;

    setCurrentLanguage(typedValue);
    onChangeSourceCodeData('languageId', LANGUAGE_ID[typedValue]);
    onChangeSourceCodeData('sourceCode', INITIAL_VALUE[typedValue]);
  };
  const { user } = useUserStore((state) => state);
  useEffect(() => {
    setCurrentLanguage(user?.language?.name as 'Python');
  }, [user?.language]);
  return (
    <section className="flex-1 flex flex-col h-full gap-4">
      <Select
        title="언어 선택"
        value={currentLanguage}
        option={typedOptions}
        setValue={(value) => changeSourceCodeData(value)}
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
        className="h-full overflow-y-scroll text-lg"
      />
    </section>
  );
}
