import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import { ICodeReviewStore, INITIAL_STATE } from './codeReviewStore.types';

/** 인증 스토어 */
const useCodeReviewStore = create<ICodeReviewStore>()(
  devtools((set) => ({
    ...INITIAL_STATE,
    actions: {
      setIsCorrect: (status) => {
        set({
          isCorrect: status,
        });
      },
      setIsSubmittedReview: (status) => {
        set({
          isSubmittedReview: status,
        });
      },
      setCodeReview: (status) => {
        set({
          codeReview: status,
        });
      },
      clearCodeReview: () => {
        set({
          codeReview: null,
        });
      },
      //초기화
      clearCodeReviewStore: () => {
        set({
          ...INITIAL_STATE,
        });
      },
    },
  }))
);

/** 인증 액션 훅 */
export function useCodeReviewStoreActions() {
  return useCodeReviewStore(
    useShallow((state) => ({
      setIsCorrect: state.actions.setIsCorrect,
      setIsSubmittedReview: state.actions.setIsSubmittedReview,
      setCodeReview: state.actions.setCodeReview,
      clearCodeReview: state.actions.clearCodeReview,
    }))
  );
}

export default useCodeReviewStore;
