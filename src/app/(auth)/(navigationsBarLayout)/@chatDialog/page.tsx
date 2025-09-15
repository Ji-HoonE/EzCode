'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatRoom, ChatRoomList } from '@/features/chat';
import useChatDialogTrigger from '@/features/chat/hooks/useChatDialogTrigger';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useSearchParams } from 'next/navigation';

export default function ChatDialog({}) {
  const sp = useSearchParams();
  const { closeChatDialog } = useChatDialogTrigger();
  const roomId = sp.get('room-id');
  const title = sp.get('title');

  if (!roomId || !title) {
    return null;
  }
  return (
    <Dialog
      open={!!roomId}
      onOpenChange={(open) => {
        if (!open) {
          closeChatDialog();
        }
      }}
    >
      <DialogContent className="max-w-[70vw] w-full w-full h-[90vh] flex bg-[#0c151c] border border-[#214d35] p-0">
        <DialogTitle className="hidden" />
        <ChatRoomList selectedRoomId={Number(roomId)} />
        <ChatRoom roomId={Number(roomId)} roomTitle={title} />
      </DialogContent>
    </Dialog>
  );
}
