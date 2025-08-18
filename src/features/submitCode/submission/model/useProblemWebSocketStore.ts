import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import {
  IMessageInitialState,
  INITIAL_STATE,
  IProblemStompResult,
  IProblemWebSocketStore,
  IWebSocketAuth,
  IWebSocketStatus,
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
      setStatus: (key, status) => {
        set((state: IWebSocketStatus) => {
          return { ...state, [key]: status };
        });
      },
      setTestCaseIds: (ids) => {
        set({ testCaseIds: ids });
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

      clearStore: () => {
        //초기화
        set({
          ...INITIAL_STATE,
        });
      },
      clearResults: () => {
        set({
          results: [],
          totalResult: null,
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
      setTestCaseIds: state.actions.setTestCaseIds,
      clearStore: state.actions.clearStore,
      clearResults: state.actions.clearResults,
    }))
  );
}

export default useProblemWebSocketStore;
