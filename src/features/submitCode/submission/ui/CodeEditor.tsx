'use client';

import CodeMirror from '@uiw/react-codemirror';
import { CODEMIRROR_EXTENSIONS, CodeMirrorBasicSetup } from '@/shared';
import { Select } from '@/shared/ui/select/Select';
import { LANGUAGE_SELECTOR_OPTIONS, SOURCECODE } from '@/shared/lib/codemirror/codeMirror.Docs';

interface ICodeEditorProps {
  onChangeSourceCodeData: (key: 'sourceCode' | 'languageId', value: number | string) => void;
  languageId: number;
}
export default function CodeEditor({ onChangeSourceCodeData, languageId }: ICodeEditorProps) {
  const handleChangeLanguage = (value: string) => {
    const languageId = Number(value); //select option required only string type value ㅠ

    onChangeSourceCodeData('languageId', languageId);
    onChangeSourceCodeData('sourceCode', SOURCECODE[languageId]);
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
        value={SOURCECODE[languageId]}
        theme={'dark'}
        onChange={(value) => onChangeSourceCodeData('sourceCode', value)}
        extensions={[CODEMIRROR_EXTENSIONS[languageId]]}
        aria-autocomplete="none"
        autoCapitalize="off"
        height="100%"
        className="h-full overflow-y-scroll text-lg"
      />
    </section>
  );
}
