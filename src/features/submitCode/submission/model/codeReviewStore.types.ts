/** 스토어 상태 인터페이스 */
export interface ICodeReviewStoreState {
  isCorrect: boolean;
  isSubmittedReview: boolean;
}

/** 스토어 액션 인터페이스 */
interface ICodeReviewInitialAction {
  actions: {
    setIsCorrect: (status: boolean) => void;
    setIsSubmittedReview: (status: boolean) => void;
  };
}

/** 인증 스토어 타입 */
export type ICodeReviewStore = ICodeReviewStoreState & ICodeReviewInitialAction;
