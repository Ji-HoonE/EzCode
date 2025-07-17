import ChatPage from '@/app/(auth)/(navigationsBarLayout)/chat/page';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChatFooterNavigation } from '@/features/chat';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function ChatDialog() {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogTitle>chatDialog</DialogTitle>
        <DialogDescription></DialogDescription>
        <ChatPage />
        <ChatFooterNavigation />
      </DialogContent>
    </Dialog>
  );
}
