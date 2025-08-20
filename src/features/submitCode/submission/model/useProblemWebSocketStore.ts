import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import {
  IInitialState,
  INITIAL_STATE,
  IProblemStompResult,
  IProblemWebSocketStore,
  IWebSocketStatus,
} from './useProblemWebSocketStore.types';

/** 인증 스토어 */
const useProblemWebSocketStore = create<IProblemWebSocketStore>()(
  devtools((set) => ({
    ...INITIAL_STATE,
    actions: {
      setStatus: (key, status) => {
        set((state: IWebSocketStatus) => {
          return { ...state, [key]: status };
        });
      },
      setPrepareData: (data) => {
        set({
          submitPrepareData: data,
        });
      },
      setResults: (key, message) => {
        set((state: IInitialState) => {
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
          } as Partial<IInitialState>;
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
      setStatus: state.actions.setStatus,
      setPrepareData: state.actions.setPrepareData,
      setResults: state.actions.setResults,
      clearStore: state.actions.clearStore,
      clearResults: state.actions.clearResults,
    }))
  );
}

export default useProblemWebSocketStore;
