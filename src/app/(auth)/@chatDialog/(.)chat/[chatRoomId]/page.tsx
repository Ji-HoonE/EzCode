import ChatRoomPage from '@/app/(auth)/chat/[chatRoomId]/page';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ChatFooterNavigation } from '@/features/chat';

export default function ChatRoomDialog() {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogTitle>채팅방</DialogTitle>
        <DialogDescription></DialogDescription>
        <ChatRoomPage />
        <ChatFooterNavigation />
      </DialogContent>
    </Dialog>
  );
}
