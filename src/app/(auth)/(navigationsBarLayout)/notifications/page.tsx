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
              <Bell className="text-[#00d084]" size={24} />
              <h2 className="text-lg font-semibold text-white">전체 알림</h2>
              {notifications.content.filter((n) => !n.isRead).length > 0 && (
                <span className="bg-[#00d084] text-white px-2 py-1 rounded-full text-xs font-medium">
                  {notifications.content.filter((n) => !n.isRead).length}개의 새 알림
                </span>
              )}
            </div>
          </div>

          {/* 알림 목록 */}
          <div className="divide-y divide-gray-800">
            {notifications.content.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-[#00d084]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-[#00d084]" size={32} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">알림이 없습니다</h3>
                <p className="text-gray-400">새로운 알림이 도착하면 여기에 표시됩니다.</p>
              </div>
            ) : (
              notifications.content.map((notification) => {
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-white/[0.08] transition-colors duration-200 cursor-pointer ${
                      !notification.isRead ? 'bg-[#00d084]/5 border-l-4 border-l-[#00d084]' : ''
                    }`}
                    onClick={async () => {
                      const result = await readNotification(notification.id);
                      console.log(result);
                      // router.push(notification.redirectUrl);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* 읽음/안읽음 인디케이터 */}
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            notification.isRead ? 'bg-gray-600' : 'bg-[#00d084] animate-pulse'
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
                            <span className="bg-[#00d084] text-white px-2 py-1 rounded-full text-xs font-medium">
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
            <div className="bg-gray-800/30 border-t border-gray-800 p-4">
              <div className="flex justify-center">
                <button className="text-[#00d084] hover:text-[#00d084]/80 text-sm font-medium transition-colors">
                  모든 알림 읽음으로 표시
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
