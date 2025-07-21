'use client';

import Timer from '@/components/Timer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetGameCharactersPvpMatchingAcceptQuery } from '@/entities/game/model/mutation/game.mutation';
import { useGetGameCharactersPvpMatchingQuery } from '@/entities/game/model/query/game.query';
import { useCallback } from 'react';

interface PvpMatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (data: unknown) => void;
}

const PvpMatchingModal = ({ isOpen, onClose, onAccept }: PvpMatchingModalProps) => {
  const { data, isLoading } = useGetGameCharactersPvpMatchingQuery(isOpen);

  const { mutateAsync } = useGetGameCharactersPvpMatchingAcceptQuery();

  const handleAcceptClick = async () => {
    try {
      if (!data?.data?.result?.enemyIdToken) return;
      const res = await mutateAsync({
        battleToken: data?.data?.result?.enemyIdToken,
      });
      onAccept(res?.data?.result);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimeEnd = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AlertDialog open={isOpen}>
      {!isLoading && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>무작위 배틀 신청</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <div>{data?.data?.result?.message}</div>
            <div>{data?.data?.result?.isEnemyStrongThanMe ? '상대: 강함' : '상대: 약함'}</div>
          </div>
          <Timer initialSeconds={60} onTimeEnd={handleTimeEnd} />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleAcceptClick}>수락</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default PvpMatchingModal;
