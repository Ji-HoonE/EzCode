'use client';
import { IChatRoom } from '../../model/useChatWebSocketStore.types';
import clsx from 'clsx';
import useChatDialogTrigger from '../../hooks/useChatDialogTrigger';
import { useChatWebSocketActions } from '../../model/useChatWebSocketStore';

interface IChatRoomItemProps {
  room: IChatRoom;
  isSelected: boolean;
}

export default function ChatRoomItem({ room, isSelected }: IChatRoomItemProps) {
  const { roomId, title, headCount } = room;
  const { handleSwitchRoom } = useChatDialogTrigger();
  const { clearMessages } = useChatWebSocketActions();

  const handleClick = () => {
    handleSwitchRoom(roomId, title);
    clearMessages();
  };

  return (
    <li
      className={clsx(
        'p-3 rounded-[10px] cursor-pointer transition-all duration-200 w-full  text-white',
        isSelected ? 'bg-primary' : 'hover:text-secondary hover:bg-white/8 '
      )}
      onClick={handleClick}
    >
      <p className="font-medium truncate">{title}</p>
      <p className="text-sm text-[#ccc] truncate"> {headCount}명</p>
    </li>
  );
}
