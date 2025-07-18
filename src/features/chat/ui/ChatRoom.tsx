'use client';
import Link from 'next/link';
import useChatRooms from '../hooks/useChatRooms';
import { getChatRoomPath } from '@/constants/paths';
import { IChatRoom } from '../model/useChatWebSocketStore.types';
import { Button } from '@/components/ui/button';

export default function ChatRoom({ room }: { room: IChatRoom }) {
  const { deleteRoom } = useChatRooms();
  const { roomId, title, headCount } = room;
  const path = getChatRoomPath(roomId);

  return (
    <li className="flex">
      <Link href={path} key={roomId}>
        <p>{title}</p>
        <p>{headCount}명</p>
      </Link>
      <Button onClick={() => deleteRoom(roomId)}>삭제</Button>
    </li>
  );
}
