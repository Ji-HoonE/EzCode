import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import { INITIAL_STATE, TGitStatusStore } from './useGitPushStatus.store.type';

/** 인증 스토어 */
const useGitPushStatusStore = create<TGitStatusStore>()(
  devtools((set) => ({
    ...INITIAL_STATE,
    actions: {
      setStatus: (status) => {
        set({ gitPushStatus: status });
      },

      clearStore: () => {
        set({
          ...INITIAL_STATE,
        });
      },
    },
  }))
);

/** 인증 액션 훅 */
export function useGitPushStatusStoreActions() {
  return useGitPushStatusStore(
    useShallow((state) => ({
      setGitPushStatus: state.actions.setStatus,
    }))
  );
}

export default useGitPushStatusStore;
