'use client';
import { PATHS } from '@/constants/paths';
import { IChatRoom } from '../model/useChatWebSocketStore.types';
import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

interface IChatRoomItemProps {
  room: IChatRoom;
  isSelected: boolean;
}

export default function ChatRoomItem({ room, isSelected }: IChatRoomItemProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { roomId, title, headCount } = room;

  const handleClickChatRoom = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(PATHS.CHAT.SEARCHPARAMS, String(roomId));
    router.replace(`?${params.toString()}`);
  };

  return (
    <li
      className={clsx(
        'p-3 rounded-[10px] cursor-pointer transition-all duration-200 /8 w-full hover:bg-white/8 text-white',
        isSelected ? 'bg-primary' : 'hover:text-secondary '
      )}
      onClick={handleClickChatRoom}
    >
      <p className="font-medium truncate">{title}</p>
      <p className="text-sm text-[#ccc] truncate"> {headCount}명</p>
    </li>
  );
}
