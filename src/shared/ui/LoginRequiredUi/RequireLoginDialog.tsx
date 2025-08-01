'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import SignForm from '@/features/auth/ui/SignForm';

interface IRequireLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function RequireLoginDialog({ isOpen, onClose }: IRequireLoginDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <SignForm />
      </DialogContent>
    </Dialog>
  );
}
