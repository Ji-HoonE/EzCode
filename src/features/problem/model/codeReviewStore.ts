import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import { ICodeReviewStore } from './codeReviewStore.types';

/** 인증 스토어 */
const useCodeReviewStore = create<ICodeReviewStore>()(
  devtools((set) => ({
    isCorrect: false,
    isSubmittedReview: false,
    codeReviewContent: '',
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
      setCodeReviewContent: (Review) => {
        set({
          codeReviewContent: Review,
        });
      },

      //초기화
      clearCodeReviewStore: () => {
        set({
          isCorrect: false,
          codeReviewContent: '',
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
      setCodeReviewContent: state.actions.setCodeReviewContent,
      setIsSubmittedReview: state.actions.setIsSubmittedReview,
    }))
  );
}

export default useCodeReviewStore;
