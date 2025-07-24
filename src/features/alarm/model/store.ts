
import { create } from "zustand"
import { Notification } from "./store.types"



interface NotificationStore {
  notifications: {
    content :  Notification[],
    page : number,
    size : number,
    totalElement : number
  }
  setNotification: (notifications: {
    content :  Notification[],
    page : number,
    size : number,
    totalElement : number
  }) => void
}

export const useNotificationsStore = create<NotificationStore>((set) => ({
  notifications: {content : [], page :0, size :0,  totalElement: 0},
  setNotification: (notifications) => set({ notifications }),
}))