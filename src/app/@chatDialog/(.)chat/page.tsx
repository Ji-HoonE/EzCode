import ChatPage from '@/app/chat/page';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function ChatDialog() {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogTitle>chatDialog</DialogTitle>
        <DialogDescription></DialogDescription>
        <ChatPage />
      </DialogContent>
    </Dialog>
  );
}
