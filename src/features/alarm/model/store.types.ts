import { NotificationTypeEnum } from "@/entities/notifications/enum"

export interface NotificationPayload {
  "@type": string
  authorId: number
  authorNickname: string
  content: string
  discussionId: number
  parentReplyId: number
  problemId: number
  replyId: number
}

export interface Notification {
  id: string
  message: string
  isRead: boolean
  createdAt: string
  notificationType: NotificationTypeEnum
  payload: NotificationPayload
  redirectUrl: string
}