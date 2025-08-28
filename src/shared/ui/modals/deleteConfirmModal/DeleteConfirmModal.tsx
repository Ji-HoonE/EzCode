import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center max-w-80">
        <DialogTitle>{title}</DialogTitle>
        <div className="my-4 text-gray-300">{description}</div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 rounded bg-gray-400" onClick={onClose}>
            취소
          </button>
          <button className="px-4 py-2 rounded bg-primary" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
