'use client';

import { Bell } from 'lucide-react';
import { useGetNotifications, useReadNotification } from '@/entities/notifications/query';
import { moveToNotificationPath } from '@/features/alarm/hooks/moveToNotificationPath';
import { Notification } from '@/features/alarm/model/store.types';
import { useRouter } from 'next/navigation';
import useNotificationsStore from '@/features/alarm/model/store';
import Pagination from '@/widgets/pagination';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { mutateAsync: readNotification } = useReadNotification();
  const { notifications, isConnected } = useNotificationsStore();
  const router = useRouter();

  const notificationQuery = useQueryClient();
  const { isLoading } = useGetNotifications(currentPage, isConnected);

  const totalPages = notifications
    ? Math.ceil(notifications.totalElements / notifications.size)
    : 0;
  const totalNotifications = notifications?.content.filter((n) => !n.isRead).length || 0;

  const handleClickNotification = async (notification: Notification) => {
    const { notificationType, id, payload, isRead } = notification;
    moveToNotificationPath(notificationType, payload.problemId, payload.discussionId, router);
    if (isRead) return;
    await readNotification(id);
    notificationQuery.invalidateQueries({ queryKey: ['notifications', currentPage] });
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.content.filter((n) => !n.isRead);
    await Promise.all(unreadNotifications.map((n) => readNotification(n.id)));
    notificationQuery.invalidateQueries({ queryKey: ['notifications', currentPage] });
  };

  return (
    <div className="flex flex-col px-10 py-18 w-full gap-4 justify-center items-center">
      <div className="flex flex-col max-w-[1600px] w-full gap-6">
        {/* 헤더 섹션 */}
        <section>
          <h1 className="text-3xl font-bold mb-2 text-secondary">알림</h1>
          <p className="text-gray-400">새로운 알림과 업데이트를 확인하세요</p>
        </section>

        {/* 알림 목록 섹션 */}
        <section className="bg-gray-900/50 rounded-[10px] border border-gray-800 overflow-hidden">
          {/* 알림 헤더 */}
          <div className="border-b border-gray-800 bg-gray-800/50 p-6">
            <div className="flex items-center gap-3">
              <Bell className="text-secondary" size={24} />
              <h2 className="text-lg font-semibold text-white">전체 알림</h2>
              <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-medium">
                {totalNotifications}개의 새 알림
              </span>
            </div>
          </div>

          {/* 알림 목록 */}
          <div className="divide-y divide-gray-800">
            {notifications.content.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-secondary" size={32} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">알림이 없습니다</h3>
                <p className="text-gray-400">새로운 알림이 도착하면 여기에 표시됩니다.</p>
              </div>
            ) : (
              notifications.content.map((notification) => {
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-white/8 transition-colors duration-200 cursor-pointer ${
                      !notification.isRead ? 'bg-secondary/5 border-l-4 border-l-secondary' : ''
                    }`}
                    onClick={() => handleClickNotification(notification)}
                  >
                    <div className="flex items-start gap-4">
                      {/* 읽음/안읽음 인디케이터 */}
                      <div className="shrink-0 mt-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            notification.isRead ? 'bg-gray-600' : 'bg-secondary animate-pulse'
                          }`}
                        />
                      </div>

                      {/* 알림 내용 */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm leading-relaxed mb-3 ${
                            notification.isRead ? 'text-gray-400' : 'text-white font-medium'
                          }`}
                        >
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {notification.createdAt.split('T')[0]}
                          </span>
                          {!notification.isRead && (
                            <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-medium">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {notifications.content.length > 0 && (
            <div className="bg-gray-800/30 border-t border-gray-800 p-4 flex justify-center">
              <button
                className="text-secondary text-sm font-medium transition-colors"
                onClick={handleMarkAllAsRead}
              >
                모든 알림 읽음으로 표시
              </button>
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  );
}
