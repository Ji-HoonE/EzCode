import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import {
  IMessageInitialState,
  IProblemStompResult,
  IProblemWebSocketStore,
} from './useProblemWebSocketStore.types';

/** 인증 스토어 */
const useProblemWebSocketStore = create<IProblemWebSocketStore>()(
  devtools((set) => ({
    sessionKey: '',
    isConnected: false,
    results: null,
    totalResult: null,
    actions: {
      setSessionKey: (key) => {
        set({
          sessionKey: key,
        });
      },
      setStatus: (status) => {
        set({
          isConnected: status,
        });
      },
      setMessage: (key, message) => {
        set((state: IMessageInitialState) => {
          if (key === 'results') {
            const newResults = [...(state.results ?? []), message] as Array<IProblemStompResult>;
            newResults.sort((a, b) => a.testcaseId - b.testcaseId);
            return {
              ...state,
              results: newResults as IProblemStompResult[],
            };
          }
          return {
            ...state,
            [key]: message,
          } as Partial<IMessageInitialState>;
        });
      },

      clearMessages: () => {
        //초기화
        set({
          isConnected: false,
          results: [],
          totalResult: null,
          error: null,
          gitStatus: null,
        });
      },
      clearResults: () => {
        set({
          results: [],
        });
      },
    },
  }))
);

/** 인증 액션 훅 */
export function useProblemWebSocketStoreActions() {
  return useProblemWebSocketStore(
    useShallow((state) => ({
      setSessionKey: state.actions.setSessionKey,
      setStatus: state.actions.setStatus,
      setMessage: state.actions.setMessage,
      clearMessages: state.actions.clearMessages,
      clearResults: state.actions.clearResults,
    }))
  );
}

export default useProblemWebSocketStore;
