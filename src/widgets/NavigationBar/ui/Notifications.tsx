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
  const unreadCount = notifications.content.filter((n) => !n.isRead).length;

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
      {/* 알림 아이콘 with 배지 */}
      <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
        <Image
          src="/icons/notification-icon.svg"
          width={20}
          height={20}
          alt="notification-icon"
          priority
          className="hover:scale-110 transition-transform duration-200"
        />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-[#214d35] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>

      {open && (
        <>
          {/* 배경 오버레이 */}
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setOpen(false)} />

          {/* 모달 드롭다운 */}
          <div className="absolute right-0 top-full mt-3 w-96 bg-[#1a1a1a] border-2 border-[#214d35] rounded-xl shadow-2xl z-50 overflow-hidden">
            {/* 헤더 */}
            <div className="bg-[#214d35] p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white text-lg">알림</h3>
                {unreadCount > 0 && (
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {unreadCount}개의 새 알림
                  </span>
                )}
              </div>
            </div>

            {/* 알림 목록 */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.content.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="bg-[#214d35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Image
                      src="/icons/notification-icon.svg"
                      width={24}
                      height={24}
                      alt="notification"
                      className="opacity-50"
                    />
                  </div>
                  <p className="text-gray-400 text-sm">새로운 알림이 없습니다</p>
                </div>
              ) : (
                notifications.content.map((notification) => (
                  <div
                    onClick={() => {
                      readNotification(notification.id);
                      pathName(notification.notificationType, notification.payload);
                      setOpen(false);
                    }}
                    key={notification.id}
                    className={`p-4 border-b border-gray-700 last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-[#214d35]/10 ${
                      !notification.isRead ? 'bg-[#214d35]/5 border-l-4 border-l-[#214d35]' : ''
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            notification.isRead ? 'bg-gray-600' : 'bg-[#214d35] animate-pulse'
                          }`}
                        />
                      </div>

                      {/* 알림 내용 */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm leading-relaxed ${
                            notification.isRead ? 'text-gray-400' : 'text-white font-medium'
                          }`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {notification.createdAt.split('T')[0]}
                          </span>
                          {!notification.isRead && (
                            <span className="bg-[#214d35] text-white px-2 py-0.5 rounded-full text-xs font-medium">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 푸터 */}
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={handleViewAll}
                className="w-full bg-[#214d35] text-white rounded-lg px-4 py-3 font-medium hover:bg-[#2a5d42] transition-all duration-200 hover:shadow-lg hover:shadow-[#214d35]/25 active:scale-[0.98]"
              >
                전체 알림 보기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
