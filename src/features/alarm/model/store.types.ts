import { NotificationTypeEnum } from '@/entities/notifications/enum';

export interface NotificationPayload {
  '@type': string;
  authorId: number;
  authorNickname: string;
  content: string;
  discussionId: number;
  parentReplyId: number;
  problemId: number;
  replyId: number;
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  notificationType: NotificationTypeEnum;
  payload: NotificationPayload;
  redirectUrl: string;
}

export interface INotifications {
  content: Notification[];
  page: number;
  size: number;
  totalElements: number;
}
/** 스토어 상태 인터페이스 */
export interface INotificationStoreState {
  notifications: INotifications;
  isConnected: boolean;
}

export const INITIAL_STATE = {
  notifications: {
    content: [],
    page: 0,
    size: 10,
    totalElements: 0,
  },
  isConnected: false,
};

/** 스토어 액션 인터페이스 */
interface INotificationStoreAction {
  actions: {
    setNotification: (notifications: INotifications) => void;
    setRealTimeNotification: (newNotification: Notification) => void;
    setIsConnected: (isConnected: boolean) => void;
  };
}

/** 인증 스토어 타입 */
export type INotificationsStore = INotificationStoreState & INotificationStoreAction;
