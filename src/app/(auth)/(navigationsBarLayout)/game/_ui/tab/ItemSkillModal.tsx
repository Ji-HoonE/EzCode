'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  useGetGameCharactersItemGamblingQuery,
  useGetGameCharactersSkillGamblingQuery,
} from '@/entities/game/model/mutation/game.mutation';
import {
  IGetGameCharactersItemGamblingResponse,
  IGetGameCharactersSkillGamblingResponse,
} from '@/api/service/game/game.interface';

interface ItemSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ItemSkillModal = ({ isOpen, onClose }: ItemSkillModalProps) => {
  const { mutateAsync } = useGetGameCharactersItemGamblingQuery();
  const { mutateAsync: mutateAsyncSkill } = useGetGameCharactersSkillGamblingQuery();

  const [result, setResult] = useState<IGetGameCharactersItemGamblingResponse | null>(null);
  const [resultSkill, setResultSkill] = useState<IGetGameCharactersSkillGamblingResponse>();

  const handleGamble = async (itemCategory: string) => {
    try {
      const response = await mutateAsync({ itemCategory: itemCategory });
      setResult(response?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGambleSkill = async () => {
    try {
      const response = await mutateAsyncSkill();
      setResultSkill(response?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setResult(null);
    onClose();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>GAMBLE</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">상점 설명</div>
        <div className="flex flex-col gap-2">
          Choose Category
          <Button variant="outline" onClick={() => handleGamble('WEAPON')}>
            WEAPON
          </Button>
          <Button variant="outline" onClick={() => handleGamble('DEFENCE')}>
            DEFENSE
          </Button>
          <Button variant="outline" onClick={() => handleGamble('ACCESSORY')}>
            ACCESSORY
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          Skill GAMBLE
          <Button variant="outline" onClick={() => handleGambleSkill()}>
            GAMBLE
          </Button>
        </div>
        <div>스킬 뽑기결과</div>
        <div className="flex flex-col gap-2">
          {resultSkill?.message}
          {resultSkill?.response?.skillEffect}
          {resultSkill?.response?.grade}
          {resultSkill?.response?.name}
          {resultSkill?.response?.skillDetails}
        </div>
        <div>아이템 뽑기결과</div>
        <div className="flex flex-col gap-2">
          {result?.message}
          {result?.itemResponse?.accuracy}
          {result?.itemResponse?.crit}
          {result?.itemResponse?.description}
          {result?.itemResponse?.evasion}
          {result?.itemResponse?.grade}
          {result?.itemResponse?.itemCategory}
          {result?.itemResponse?.itemType}
          {result?.itemResponse?.name}
          {result?.itemResponse?.speed}
          {result?.itemResponse?.stun}
        </div>
        <AlertDialogCancel onClick={handleClose}>취소</AlertDialogCancel>
        <AlertDialogAction onClick={handleClose}>확인</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ItemSkillModal;
