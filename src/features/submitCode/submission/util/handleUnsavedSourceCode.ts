'use client';
interface UnsavedSourceCode {
  sourceCode: string;
  languageId: number;
  problemId: string;
}
export default function handleUnsavedSourceCode() {
  if (typeof window !== 'undefined') {
    const localStorage = window.localStorage;
    let unsavedSourceCode: UnsavedSourceCode | null = null;
    const stringifySourceCode = localStorage.getItem('unsavedSourceCode');

    unsavedSourceCode = JSON.parse(stringifySourceCode || '');

    const setUnsavedSourceCode = (sourceCodeData: UnsavedSourceCode) => {
      const stringifySourceCode = JSON.stringify(sourceCodeData);
      localStorage.setItem('unsavedSourceCode', stringifySourceCode);
    };
    return [unsavedSourceCode, setUnsavedSourceCode] as const;
  }
  return [null, () => {}] as const;
}
