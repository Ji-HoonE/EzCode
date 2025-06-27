import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

/** 인증 스토어 상태 인터페이스 */
interface IAuthInitialState {
    accessToken: string | null;

}
/** 인증 스토어 액션 인터페이스 */
interface IAuthInitialAction {
    actions: {
        setAccessToken: (pToken: string) => void;
        removeAccessToken: () => void;
    }
}

/** 인증 스토어 타입 */
type IAuthStore = IAuthInitialState & IAuthInitialAction;

/** 인증 스토어 */
const useAuthStore = create<IAuthStore>()(
    devtools(
        (set) => ({
            accessToken: null,
            actions: {
                setAccessToken: (pToken: string) => {
                    set({ accessToken: pToken });
                },
                removeAccessToken: () => {
                    set({ accessToken: null });
                },
            }
        }),
    )
);

/** 인증 액션 훅 */
export function useAuthStoreActions() {
    return useAuthStore(useShallow((state) => state.actions));
}


export default useAuthStore;