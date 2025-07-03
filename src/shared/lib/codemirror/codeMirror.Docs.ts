import { IProblemRequestData } from '@/features/problem/types/problem.request.data.type';
import {
  ILanguageSelectOption,
  LANGUAGE_ID,
  ProblemLanguageType,
} from '@/shared/types/problem.type';

//언어 선택시 초기 값
export const INITIAL_VALUE: Record<ProblemLanguageType, string> = {
  Python: `# Python code goes here\nprint("Hello, World!")\n`,
  Java: `// Java code goes here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
  Cpp: `// C++ code goes here\n#include <iostream>\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}\n`,
  C: '// C code goes here',
};

//기본 언어
export const INITIAL_LANG = 'Python';

// 초기 소스 코드 데이터
export const INITIAL_SOURCE_CODE_DATA: IProblemRequestData = {
  languageId: LANGUAGE_ID[INITIAL_LANG],
  sourceCode: INITIAL_VALUE[INITIAL_LANG],
};

//언어 옵션
export const LANGUAGE_SELECTOR_OPTIONS: ILanguageSelectOption[] = [
  { value: 'Python', label: 'Python', id: LANGUAGE_ID.Python },
  { value: 'Java', label: 'Java', id: LANGUAGE_ID.Java },
  { value: 'Cpp', label: 'C++', id: LANGUAGE_ID.Cpp },
  { value: 'C', label: 'C', id: LANGUAGE_ID.Cpp },
];
