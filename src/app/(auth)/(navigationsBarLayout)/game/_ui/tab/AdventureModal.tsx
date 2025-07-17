'use client';
import { IGetGameCharactersAdventureChoiceResponse } from '@/api/service/game/game.interface';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useGetGameCharactersAdventureChoiceQuery } from '@/entities/game/model/mutation/game.mutation';
import { useGetGameCharactersAdventureQuery } from '@/entities/game/model/query/game.query';

import { useState } from 'react';
interface AdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdventureModal = ({ isOpen, onClose }: AdventureModalProps) => {
  const { data, isLoading } = useGetGameCharactersAdventureQuery(isOpen);
  const [result, setResult] = useState<IGetGameCharactersAdventureChoiceResponse>();

  const { mutateAsync } = useGetGameCharactersAdventureChoiceQuery();

  const handleChoiceClick = async (choice: boolean) => {
    try {
      const response = await mutateAsync({
        encounterToken: data?.data?.result?.encounterId || '',
        playerDecision: choice,
      });
      console.log('응답:', response); // 전체 응답 확인
      setResult(response?.data?.result); // response 자체를 저장
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog open={isOpen}>
      {!isLoading && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>어드벤처</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <div>{data?.data?.result?.encounterCategory}</div>
            <div>{data?.data?.result?.encounterText}</div>
            <Button variant="outline" onClick={() => handleChoiceClick(true)}>
              {data?.data?.result?.choice1Text}
            </Button>
            <Button variant="outline" onClick={() => handleChoiceClick(false)}>
              {data?.data?.result?.choice2Text}
            </Button>
          </div>
          {result && (
            <div className="mt-4 space-y-2">
              <div>{result?.log}</div>
              <div>{result?.isPositive ? '성공' : '실패'}</div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default AdventureModal;
