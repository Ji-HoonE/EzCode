'use client';
import useChatWebSocketStore from '../../model/useChatWebSocketStore';
// import CreateChatRoomDialog from './CreateChatRoomDialog';
import ChatRoomItem from './ChatRoomItem';
import useSubChatRooms from '../../hooks/socket/useSubChatRooms';
import ChatSearchBar from './ChatSearchBar';
import { useEffect, useState } from 'react';

interface IChatRoomListProps {
  selectedRoomId: number;
}
export default function ChatRoomList({ selectedRoomId }: IChatRoomListProps) {
  useSubChatRooms();
  const { rooms } = useChatWebSocketStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoom, setFilteredRoom] = useState(rooms);

  const handleSearchRoom = (value: string) => {
    setSearchQuery(value);
    const newRooms = rooms.filter((room) => room.title.includes(value));
    setFilteredRoom(newRooms);
  };

  useEffect(() => {
    setFilteredRoom(rooms);
  }, [rooms]);

  return (
    <section className="h-full w-full flex-1/5 border-r border-[#214d35] bg-[#0c151c] relative rounded-l-[10px]">
      <div className="flex items-center justify-between p-4 border-b border-[#214d35] ">
        <h2 className="text-xl font-semibold text-white">채팅</h2>
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
                  isSelected={selectedRoomId === room.roomId}
                />
              );
            })}
          </ul>
        ) : (
          <div className="h-full absolute top-0 left-0 w-full h-full flex items-center justify-center">
            생성된 채팅방이 없습니다.
          </div>
        )}
      </div>
      {/* <CreateChatRoomDialog /> */}
    </section>
  );
}
