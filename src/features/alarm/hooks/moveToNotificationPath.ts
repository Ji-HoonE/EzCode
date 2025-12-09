import { NotificationTypeEnum } from '@/entities/notifications/enum';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function moveToNotificationPath(
  type: NotificationTypeEnum,
  problemId: number,
  discussionId: number,
  router: AppRouterInstance
) {
  switch (type) {
    case NotificationTypeEnum.COMMUNITY_CHILD_REPLY:
      return router.push(`/problems/${problemId}?discussion=true&discussionId=${discussionId}`);
    case NotificationTypeEnum.COMMUNITY_DISCUSSION_REPLY:
      return router.push(`/problems/${problemId}?discussion=true&discussionId=${discussionId}`);
    case NotificationTypeEnum.COMMUNITY_DISCUSSION_VOTED_UP:
      return router.push(`/problems/${problemId}?discussion=true&discussionId=${discussionId}`);
    case NotificationTypeEnum.COMMUNITY_MENTIONED:
      return router.push(`/problems/${problemId}?discussion=true&discussionId=${discussionId}`);
    case NotificationTypeEnum.COMMUNITY_REPLY_VOTED_UP:
      return router.push(`/problems/${problemId}?discussion=true&discussionId=${discussionId}`);
    default:
      return;
  }
}
