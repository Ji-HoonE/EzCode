import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import {
  IMessageInitialState,
  INITIAL_STATE,
  IProblemStompResult,
  IProblemWebSocketStore,
  IWebSocketAuth,
} from './useProblemWebSocketStore.types';

/** 인증 스토어 */
const useProblemWebSocketStore = create<IProblemWebSocketStore>()(
  devtools((set) => ({
    ...INITIAL_STATE,
    actions: {
      setAuth: (key, value) => {
        set((state: IWebSocketAuth) => {
          return {
            ...state,
            [key]: value,
          };
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
      setAuth: state.actions.setAuth,
      setStatus: state.actions.setStatus,
      setMessage: state.actions.setMessage,
      clearMessages: state.actions.clearMessages,
      clearResults: state.actions.clearResults,
    }))
  );
}

export default useProblemWebSocketStore;
