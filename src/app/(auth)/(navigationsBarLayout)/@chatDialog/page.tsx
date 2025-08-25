'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatRoom, ChatRoomList } from '@/features/chat';
import { DialogTitle } from '@radix-ui/react-dialog';
import { use } from 'react';

interface ChatDialogProps {
  searchParams: Promise<{ 'room-id': string; title: string }>;
}
export default function ChatDialog({ searchParams }: ChatDialogProps) {
  const roomId = use(searchParams)['room-id'];
  const title = use(searchParams)['title'];

  console.log(roomId, title);
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
