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
import { useDebounce } from '@/shared/util/debounced';
import { useSaveDraftData } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation';
import Cookies from 'js-cookie';

interface ICodeEditorProps {
  onChangeSourceCodeData: (key: 'sourceCode' | 'languageId', value: number | string) => void;
  sourceCodeData: ISourceCode;
  problemId: string;
  draftVersion: number;
  setDraftVersion: (version: number) => void;
}
export default function CodeEditor({
  onChangeSourceCodeData,
  sourceCodeData,
  problemId,
  draftVersion,
  setDraftVersion,
}: ICodeEditorProps) {
  const { languageId } = sourceCodeData;
  const { debouncedFn, debounceStatus } = useDebounce(3000);
  const accessToken = Cookies.get('accessToken');
  const { mutateAsync: saveDraft } = useSaveDraftData(!!accessToken);

  const handleChangeLanguage = (value: string) => {
    const languageId = Number(value);
    onChangeSourceCodeData('languageId', languageId);
    onChangeSourceCodeData('sourceCode', SOURCECODE[languageId]);
  };

  const handleChangeCode = (value: string) => {
    onChangeSourceCodeData('sourceCode', value);
    debouncedFn(() =>
      saveDraft({
        problemId: Number(problemId),
        languageId: sourceCodeData.languageId,
        code: sourceCodeData.sourceCode,
        version: draftVersion,
      }).then((newVersion) => {
        if (typeof newVersion === 'number') {
          setDraftVersion(newVersion);
        }
      })
    );
  };

  return (
    <section className="flex-1 flex flex-col h-full gap-4">
      <div className="flex items-center justify-between px-2">
        <Select
          title="언어 선택"
          value={String(languageId)}
          option={LANGUAGE_SELECTOR_OPTIONS}
          setValue={(value) => handleChangeLanguage(value)}
        />
        <div>
          {debounceStatus === 'success' && (
            <span className="text-[#ccc] text-sm">자동 저장 완료</span>
          )}
          {debounceStatus === 'error' && (
            <span className="text-[#ccc] text-sm">자동 저장 실패</span>
          )}
        </div>
      </div>

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
