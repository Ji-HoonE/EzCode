'use client';

import { NotificationTypeEnum } from '@/entities/notifications/enum';
import { useReadNotification } from '@/entities/notifications/query';
import useConnectAlarmWebSocket from '@/features/alarm/hooks/socket/useNotificationWebSocket';
import { useNotificationsStore } from '@/features/alarm/model/store';
import { NotificationPayload } from '@/features/alarm/model/store.types';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Notifications() {
  useConnectAlarmWebSocket();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { notifications } = useNotificationsStore();
  const { mutateAsync: readNotification } = useReadNotification();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleViewAll = () => {
    router.push('/notifications');
    setOpen(false);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const pathName = (type: NotificationTypeEnum, payload: NotificationPayload) => {
    switch (type) {
      case NotificationTypeEnum.COMMUNITY_CHILD_REPLY:
        return router.push(
          `/problems/${payload.problemId}?discussion=true&discussionId=${payload.discussionId}`
        );
      case NotificationTypeEnum.COMMUNITY_DISCUSSION_REPLY:
        return router.push(
          `/problems/${payload.problemId}?discussion=true&discussionId=${payload.discussionId}`
        );
      case NotificationTypeEnum.COMMUNITY_DISCUSSION_VOTED_UP:
        return router.push(
          `/problems/${payload.problemId}?discussion=true&discussionId=${payload.discussionId}`
        );
      case NotificationTypeEnum.COMMUNITY_MENTIONED:
        return router.push(
          `/problems/${payload.problemId}?discussion=true&discussionId=${payload.discussionId}`
        );
      case NotificationTypeEnum.COMMUNITY_REPLY_VOTED_UP:
        return router.push(
          `/problems/${payload.problemId}?discussion=true&discussionId=${payload.discussionId}`
        );
      default:
        return;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src="/icons/notification-icon.svg"
        width={20}
        height={20}
        alt="notification-icon"
        priority
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-card border border-border rounded-[10px] shadow-hover z-999 bg-[#0c151c]">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground">알림</h3>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.content.map((notification) => (
              <div
                onClick={() => {
                  readNotification(notification.id);
                  pathName(notification.notificationType, notification.payload);
                }}
                key={notification.id}
                className={`flex flex-row justify-between w-full border-b border-border last:border-b-0 
      transition-colors cursor-pointer 
      ${notification.isRead ? 'bg-transparent' : 'bg-primary/10'} 
      hover:bg-muted/20
    `}
              >
                <div className="w-full flex p-4 gap-4 items-center">
                  <div className="justify-center items-center flex-shrink-0 flex">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        notification.isRead ? 'bg-gray-500' : 'bg-primary'
                      }`}
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm mt-1 line-clamp-2 ${
                          notification.isRead
                            ? 'text-muted-foreground'
                            : 'text-foreground font-medium'
                        }`}
                      >
                        {notification.message}
                      </p>
                      <span className="text-muted text-xs mt-2 block">
                        {notification.createdAt.split('T')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <button
              onClick={handleViewAll}
              className="w-full bg-primary text-primary-foreground rounded-[10px] px-4 py-2 hover:bg-[#276e48] transition-all duration-200 hover:shadow-hover active:bg-[#1e3e2c] active:scale-[0.98]"
            >
              전체보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
