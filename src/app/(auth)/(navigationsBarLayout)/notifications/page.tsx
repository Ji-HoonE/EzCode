'use client';

import type React from 'react';

import { Bell } from 'lucide-react';

import { useNotificationsStore } from '@/features/alarm/model/store';
import { useReadNotification } from '@/entities/notifications/query';

export default function Notifications() {
  const { notifications } = useNotificationsStore();
  const { mutateAsync: readNotification } = useReadNotification();
  // const queryClient = useQueryClient();
  // const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="text-accent" size={28} />
          <h1 className="text-2xl font-bold text-foreground">알림</h1>
        </div>

        {/* 알림 목록 */}
        <div className="space-y-4">
          {notifications.content.map((notification) => {
            return (
              <div
                key={notification.id}
                className={`bg-card  border-border rounded-[10px] p-6 shadow-subtle hover:shadow-hover transition-all duration-200 cursor-pointer  ${
                  !notification.isRead
                    ? 'border-[2px] border-[#214d35]'
                    : 'border-[1px] border-[#2a2a2a]'
                }`}
                onClick={async () => {
                  const result = await readNotification(notification.id);
                  console.log(result);
                  // router.push(notification.redirectUrl);
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-row gap-4 items-center w-full">
                    {!notification.isRead && (
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.isRead ? 'bg-gray-500' : 'bg-primary'
                        }`}
                      />
                    )}
                    <div className="flex-1 min-w-0 justify-between flex-ronsmw ">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted">{notification.createdAt}</span>
                        {!notification.isRead && (
                          <span className="text-[#FFF] font-medium">새 알림</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {notifications.content.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-lg font-medium text-foreground mb-2">알림이 없습니다</h3>
            <p className="text-muted-foreground">새로운 알림이 도착하면 여기에 표시됩니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}
