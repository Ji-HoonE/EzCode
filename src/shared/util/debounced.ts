import { useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

export type TDebounceFnStatus = 'idle' | 'pending' | 'success' | 'error';

/**@param delay- debounce 딜레이 */
export function useDebounce(delay = 2000) {
  const [debounceStatus, setDebounceStatus] = useState<TDebounceFnStatus>('idle');
  const debouncedFn = useMemo(
    () =>
      debounce(async (debouncedFn: () => void) => {
        try {
          setDebounceStatus('pending');
          debouncedFn();
          setDebounceStatus('success');
        } catch {
          setDebounceStatus('error');
        } finally {
          setTimeout(() => {
            setDebounceStatus('idle');
          }, 500);
        }
      }, delay),
    [delay]
  );

  return { debouncedFn, debounceStatus };
}
