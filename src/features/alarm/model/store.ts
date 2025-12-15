import { INITIAL_STATE, INotificationsStore, INotificationStoreState } from './store.types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

/** 인증 스토어 */
const useNotificationsStore = create<INotificationsStore>()(
  devtools((set) => ({
    ...INITIAL_STATE,
    actions: {
      setNotification: (notifications) => {
        set({
          notifications: notifications,
        });
      },
      setRealTimeNotification: (newNotification) => {
        set((state: INotificationStoreState) => {
          return {
            ...state,
            notifications: {
              ...state.notifications,
              content: [newNotification, ...state.notifications.content],
              totalElements: state.notifications.totalElements + 1,
            },
          };
        });
      },
      setIsConnected: (isConnected: boolean) => {
        set({
          isConnected,
        });
      },
    },
  }))
);

/** 인증 액션 훅 */
export function useNotificationsActions() {
  return useNotificationsStore(
    useShallow((state) => ({
      setNotification: state.actions.setNotification,
      setRealTimeNotification: state.actions.setRealTimeNotification,
      setIsConnected: state.actions.setIsConnected,
    }))
  );
}
export default useNotificationsStore;
