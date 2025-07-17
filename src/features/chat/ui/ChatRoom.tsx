'use client';
import { Room } from '../types/stomp';
import Link from 'next/link';
import useChatRooms from '../hooks/useChatRooms';
import { getChatRoomPath } from '@/constants/paths';
import { BouncingDots } from '@/shared/ui/loading-indicators';

export default function ChatRoom({ room }: { room: Room }) {
  const { deleteRoom, deletePending } = useChatRooms();
  const { roomId, title, headCount } = room;
  const path = getChatRoomPath(roomId);

  return (
    <li className="flex">
      <Link href={path} key={roomId}>
        <p>{title}</p>
        <p>{headCount}명</p>
      </Link>
      <button onClick={() => deleteRoom(roomId)}>
        {deletePending ? '방삭제' : <BouncingDots />}
      </button>
    </li>
  );
}
