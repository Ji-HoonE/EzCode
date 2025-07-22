import { Dialog, DialogContent } from '@/components/ui/dialog';
import ChatPage from '../../chat/page';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ChatDialogProps {
  searchParams: Promise<{ room_id: string }>;
}
export default function ChatDialog({ searchParams }: ChatDialogProps) {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="w-full max-w-6xl h-[90vh]">
        <DialogTitle></DialogTitle>
        <ChatPage searchParams={searchParams} />
      </DialogContent>
    </Dialog>
  );
}
