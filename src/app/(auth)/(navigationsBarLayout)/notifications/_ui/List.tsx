'use client';

import { useNotificationsStore } from '@/features/alarm/model/store';

export const NotificationList = () => {
  const { notifications } = useNotificationsStore();

  return (
    <div className="flex flex-col gap-2 bg-[#FFF]">
      {notifications.content.map((item) => {
        return (
          <div key={item.id} className="flex flex-row justify-between w-full p-4">
            <span className="text-[#000]">{item.message}</span>
            <span className="text-[#000]">{item.createdAt.split('T')[0]}</span>
          </div>
        );
      })}
    </div>
  );
};
