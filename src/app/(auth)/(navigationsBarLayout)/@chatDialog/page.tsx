import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatRoom, ChatRoomList } from '@/features/chat';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ChatDialogProps {
  searchParams: Promise<{ 'room-id': string; title: string }>;
}
export default async function ChatDialog({ searchParams }: ChatDialogProps) {
  const roomId = (await searchParams)['room-id'];
  const title = (await searchParams)['title'];

  return (
    <Dialog open={!!roomId}>
      <DialogContent
        className="max-w-[70vw] w-full h-[90vh] sm:max-w-[70vw] flex justify-center px-0"
        showCloseButton={false}
      >
        <DialogTitle className="hidden" />
        <ChatRoomList selectedRoomId={roomId} />
        <ChatRoom roomId={roomId} roomTitle={title} />
      </DialogContent>
    </Dialog>
  );
}
