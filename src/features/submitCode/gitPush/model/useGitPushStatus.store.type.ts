/** gitStatus 상태 타입 */
export type TGitPushStatus = 'STARTED' | 'SUCCESS' | 'FAILED' | null;

export interface IGitPushStatusStoreState {
  gitPushStatus: TGitPushStatus;
}
/** 스토어 액션 인터페이스 */
interface IGitPushStatusStoreAction {
  actions: {
    setGitPushStatus: (status: TGitPushStatus) => void;
    clearStore: () => void;
  };
}

export const INITIAL_STATE = {
  gitPushStatus: null,
};

/** 인증 스토어 타입 */
export type TGitStatusStore = IGitPushStatusStoreState & IGitPushStatusStoreAction;
