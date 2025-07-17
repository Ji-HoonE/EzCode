'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetGameCharactersPvpHistoryQuery } from '@/entities/game/model/query/game.query';

interface PvpHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PvpHistoryModal = ({ isOpen, onClose }: PvpHistoryModalProps) => {
  const { data, isLoading } = useGetGameCharactersPvpHistoryQuery(isOpen);

  console.log(data);

  return (
    <AlertDialog open={isOpen}>
      {!isLoading && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>PVP 기록 확인</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2"></div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => {}}>수락</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default PvpHistoryModal;
