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
    isSubmitted: false,
    testCase: null,
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
          isSubmitted: status,
        });
      },

      setMessage: (key, message) => {
        set((state: IMessageInitialState) => {
          if (key === 'results') {
            const newResults = [...(state.results ?? []), message] as Array<IProblemStompResult>;
            newResults.sort((a, b) => a.seqId - b.seqId);
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
          isSubmitted: false,
          initCases: null,
          results: [],
          finalResult: null,
          error: null,
          gitStatus: null,
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
    }))
  );
}

export default useProblemWebSocketStore;
