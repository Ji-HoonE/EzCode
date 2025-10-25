import { useMemo } from 'react';
import debounce from 'lodash.debounce';

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';
type SetStatusType = (status: AutoSaveStatus) => void;

/**@param delay- debounce 딜레이 */
/**로컬스토리지 자동 저장 훅 */
export function useAutoSave(delay = 2000) {
  const debouncedSave = useMemo(
    () =>
      debounce((key: string, value: unknown, setStatus?: SetStatusType) => {
        try {
          setStatus?.('saving');
          const serializedValue = JSON.stringify(value);
          localStorage.setItem(key, serializedValue);
          setStatus?.('saved');
        } catch {
          setStatus?.('error');
        }
      }, delay),
    [delay]
  );

  return debouncedSave;
}
