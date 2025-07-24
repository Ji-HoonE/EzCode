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
  notificationType: string
  payload: NotificationPayload
  redirectUrl: string
}