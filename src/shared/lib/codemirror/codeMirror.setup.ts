import { LanguageSupport } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { BasicSetupOptions } from '@uiw/react-codemirror';

export const CodeMirrorBasicSetup: BasicSetupOptions = {
  autocompletion: false,
};

export const CODEMIRROR_EXTENSIONS: Record<number, LanguageSupport> = {
  1: java(),
  2: cpp(),
  3: cpp(),
  4: python(),
};
