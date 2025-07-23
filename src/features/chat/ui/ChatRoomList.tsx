'use client';
import useChatWebSocketStore from '../model/useChatWebSocketStore';
// import CreateChatRoomDialog from './CreateChatRoomDialog';
import ChatRoomItem from './ChatRoomItem';
import useSubChatRooms from '../hooks/socket/useSubChatRooms';
import ChatSearchBar from './ChatSearchBar';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useChatDialogTrigger from '../hooks/useChatDialogTrigger';

interface IChatRoomListProps {
  selectedRoomId: string;
}
export default function ChatRoomList({ selectedRoomId }: IChatRoomListProps) {
  useSubChatRooms();
  const { rooms } = useChatWebSocketStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoom, setFilteredRoom] = useState(rooms);
  const { closeChatDialog } = useChatDialogTrigger();

  const handleSearchRoom = (value: string) => {
    setSearchQuery(value);
    const newRooms = rooms.filter((room) => room.title.includes(value));
    setFilteredRoom(newRooms);
  };

  useEffect(() => {
    setFilteredRoom(rooms);
  }, [rooms]);

  return (
    <section className="h-full w-full flex-1/5 border-r border-border_primary/20">
      <div className="flex items-center justify-between p-4 border-b border-border_primary/20">
        <h2 className="text-xl font-semibold text-white">채팅</h2>
        <button
          onClick={closeChatDialog}
          className="hover:bg-white/10 rounded-[10px] transition-colors"
        >
          <Image src="/icons/close/closeWithBorder.svg" height={20} width={20} alt="closeBtn" />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <ChatSearchBar searchQuery={searchQuery} onSearch={handleSearchRoom} />
        {rooms.length > 0 ? (
          <ul>
            {filteredRoom.map((room) => {
              return (
                <ChatRoomItem
                  key={room.roomId}
                  room={room}
                  isSelected={Number(selectedRoomId) === room.roomId}
                />
              );
            })}
          </ul>
        ) : (
          <div>생성된 채팅방이 없습니다.</div>
        )}
      </div>
      {/* <CreateChatRoomDialog /> */}
    </section>
  );
}
