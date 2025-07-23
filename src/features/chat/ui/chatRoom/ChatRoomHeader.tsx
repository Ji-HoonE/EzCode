// import { Button } from '@/components/ui/button';
import Image from 'next/image';
// import useChatRooms from '../../hooks/useChatRooms';

interface IChatRoomHeaderProps {
  // roomId: string;
  roomTitle: string;
}
export default function ChatRoomHeader({ roomTitle }: IChatRoomHeaderProps) {
  // const { deleteRoom } = useChatRooms();

  return (
    <div className="flex items-center justify-between p-4 border-b border-border_primary/20">
      <div className="flex items-center space-x-3">
        <Image
          src="/icons/group.svg"
          alt="채팅방 이미지"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h3 className="font-medium text-white">{roomTitle}</h3>
      </div>
      <div className="flex items-center space-x-2">
        {/* <Button
          onClick={() => deleteRoom(Number(roomId))}
          className="p-2 hover:bg-white/10 rounded-[10px] transition-colors"
        >
          삭제
        </Button> */}
      </div>
    </div>
  );
}
