import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import ChatRoomList from '@/features/chat/ui/ChatRoomList';
import ChatRoom from '@/features/chat/ui/ChatRoom';

interface ChatDialogProps {
  searchParams: Promise<{ 'room-id': string; 'chat-open': boolean }>;
}
export default async function ChatDialog({ searchParams }: ChatDialogProps) {
  const roomId = (await searchParams)['room-id'];
  const isChatOpen = (await searchParams)['chat-open'];

  return (
    <Dialog open={isChatOpen}>
      <DialogContent className="w-full max-w-6xl h-[90vh]">
        <DialogTitle>채팅</DialogTitle>
        <main className="w-full flex h-full gap-5 px-20">
          <div className="w-full flex gap-5 justify-center h-200">
            <ChatRoomList selectedRoomId={roomId} />
            <ChatRoom roomId={roomId} />
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}
