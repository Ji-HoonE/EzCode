import { LanguageSupport } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { BasicSetupOptions } from '@uiw/react-codemirror';
import { ProblemLanguageType } from '@/shared/types/problem.type';

export const CodeMirrorBasicSetup: BasicSetupOptions = {
  autocompletion: false,
};

export const CODEMIRROR_EXTENSIONS: Record<ProblemLanguageType, LanguageSupport> = {
  Python: python(),
  Java: java(),
  Cpp: cpp(),
  C: cpp(),
};
