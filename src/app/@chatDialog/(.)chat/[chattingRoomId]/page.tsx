import ChattingRoomPage from '@/app/chat/[chattingRoomId]/page';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChatFooterNavigation } from '@/features/chat';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function ChattingRoomDialog() {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogTitle>채팅방</DialogTitle>
        <DialogDescription></DialogDescription>
        <ChattingRoomPage />
        <ChatFooterNavigation />
      </DialogContent>
    </Dialog>
  );
}
