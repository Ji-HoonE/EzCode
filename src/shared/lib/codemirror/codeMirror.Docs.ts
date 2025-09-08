import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import { OptionType } from '@/shared/ui/select/Select';

//언어 선택시 초기 값
export const SOURCECODE: Record<number, string> = {
  1: `// Java code goes here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
  2: `// C code goes here`,
  3: `// C++ code goes here\n#include <iostream>\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}\n`,
  4: `# Python code goes here\nprint("Hello, World!")\n`,
};

//기본 언어
export const INITIAL_LANGUAGE_ID = 3; //cpp 가 기본언어

// 초기 소스 코드 데이터
export const INITIAL_SOURCE_CODE_DATA: ISourceCode = {
  languageId: INITIAL_LANGUAGE_ID,
  sourceCode: SOURCECODE[INITIAL_LANGUAGE_ID],
};

//언어 옵션
export const LANGUAGE_SELECTOR_OPTIONS: OptionType[] = [
  { label: 'Java', value: '1' },
  { label: 'C', value: '2' },
  { label: 'Cpp', value: '3' },
  { label: 'Python', value: '4' },
];

//언어 선택으로 languageId, sourceCode 변경 함수
export const fetchSourceCodeData = (languageId: number): ISourceCode => {
  return {
    languageId: languageId,
    sourceCode: SOURCECODE[languageId] || '',
  };
};
