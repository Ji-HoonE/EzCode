import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import { ICodeReviewStore } from './codeReviewStore.types';

/** 인증 스토어 */
const useCodeReviewStore = create<ICodeReviewStore>()(
  devtools((set) => ({
    isCorrect: false,
    isSubmittedReview: false,
    codeReviewContent: null,
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
      setCodeReviewContent: (review) => {
        const matches = [...review.matchAll(/(\*\*(.*?)\*\*)([^*]+)/g)];
        const sections = matches.map(([_, _unused, key, content]) => ({
          key,
          content: content.trim(),
        }));
        set({
          codeReviewContent: sections,
        });
      },

      //초기화
      clearCodeReviewStore: () => {
        set({
          isCorrect: false,
          codeReviewContent: null,
          isSubmittedReview: false,
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
