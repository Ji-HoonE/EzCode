'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatRoom, ChatRoomList } from '@/features/chat';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useSearchParams } from 'next/navigation';

export default function ChatDialog({}) {
  const sp = useSearchParams();

  const roomId = sp.get('room-id');
  const title = sp.get('title');

  if (!roomId || !title) {
    return null;
  }
  return (
    <Dialog open={!!roomId}>
      <DialogContent
        className="max-w-[70vw] w-full h-[90vh] sm:max-w-[70vw] flex justify-center px-0"
        showCloseButton={false}
      >
        <DialogTitle className="hidden" />
        <ChatRoomList selectedRoomId={Number(roomId)} />
        <ChatRoom roomId={Number(roomId)} roomTitle={title} />
      </DialogContent>
    </Dialog>
  );
}
