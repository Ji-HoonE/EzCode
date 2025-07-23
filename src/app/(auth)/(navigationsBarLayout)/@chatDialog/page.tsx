import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import ChatRoomList from '@/features/chat/ui/ChatRoomList';
import ChatRoom from '@/features/chat/ui/chatRoom';

interface ChatDialogProps {
  searchParams: Promise<{ 'room-id': string; title: string }>;
}
export default async function ChatDialog({ searchParams }: ChatDialogProps) {
  const roomId = (await searchParams)['room-id'];
  const title = (await searchParams)['title'];

  return (
    <Dialog open={!!roomId}>
      <DialogContent
        className="max-w-[70vw] w-full h-[90vh] sm:max-w-[70vw]"
        showCloseButton={false}
      >
        <DialogTitle className="hidden" />
        <main className="w-full flex h-full gap-5 ">
          <div className="w-full flex gap-5 justify-center h-200">
            <ChatRoomList selectedRoomId={roomId} />
            <ChatRoom roomId={roomId} roomTitle={title} />
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}
