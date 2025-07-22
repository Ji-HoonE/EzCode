'use client';
import useChatWebSocketStore from '../model/useChatWebSocketStore';
import CreateChatRoomDialog from './CreateChatRoomDialog';
import ChatRoomItem from './ChatRoomItem';
import useSubChatRooms from '../hooks/socket/useSubChatRooms';

interface IChatRoomListProps {
  selectedRoomId: string;
}
export default function ChatRoomList({ selectedRoomId }: IChatRoomListProps) {
  useSubChatRooms();
  const { rooms } = useChatWebSocketStore();
  // const [searchQuery, setSearchQuery] = useState('');
  // const [filteredRoom, setFilteredRoom] = useState(rooms);

  // const handleSearchRoom = (value: string) => {
  //   setSearchQuery(value);
  //   const newRooms = rooms.filter((room) => room.title.includes(value));
  //   setFilteredRoom(newRooms);
  // };

  return (
    <section className="h-full w-full flex-1/5">
      <h1 className="text-xl font-semibold">채팅</h1>
      {/* <ChatSearchBar searchQuery={searchQuery} onSearch={handleSearchRoom} /> */}
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => {
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
      <CreateChatRoomDialog />
    </section>
  );
}
