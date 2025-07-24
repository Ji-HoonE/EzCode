'use client';

import useConnectAlarmWebSocket from '@/features/alarm/hooks/socket/useNotificationWebSocket';
import { useNotificationsStore } from '@/features/alarm/model/store';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Notifications() {
  useConnectAlarmWebSocket();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { notifications } = useNotificationsStore();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div className="relative">
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
        <div className="absolute top-full right-0 mt-2 min-w-[300px] max-w-xs bg-white shadow-xl rounded-xl p-4 z-50 w-fit">
          <div className="mt-2 text-sm text-[#000] space-y-2">
            {notifications.content.map((item) => (
              <Link
                key={item.id}
                href={`/problems/${item.payload.problemId}/discussions/${item.payload.discussionId}`}
                className="block"
              >
                <div className="flex justify-between w-full">
                  <span className="text-[#000] mr-2 break-words min-w-0 max-w-[80%]">
                    • {item.message}
                  </span>
                  <span className="text-[#000] whitespace-nowrap text-right pl-2">
                    {item.createdAt.split('T')[0]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link className="text-[#000]" href="/notifications">
            전체보기
          </Link>
        </div>
      )}
    </div>
  );
}
