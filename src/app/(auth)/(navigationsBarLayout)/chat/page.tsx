import ChatRoom from '@/features/chat/ui/ChatRoom';
import ChatRoomList from '@/features/chat/ui/ChatRoomList';

interface ChatPageProps {
  searchParams: Promise<{ room_id: string }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const roomId = (await searchParams).room_id;
  return (
    <main className="w-full flex h-full pt-20 gap-5 px-20">
      <div className="w-full flex gap-5 justify-center">
        <ChatRoomList selectedRoomId={roomId} />
        <ChatRoom roomId={roomId} />
      </div>
    </main>
  );
}
