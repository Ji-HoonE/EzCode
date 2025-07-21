'use client';

import { API_CONSTANTS } from '@/api/constants/api.constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGameCharacterEquipItemMutation } from '@/entities/game/model/mutation/game.mutation';
import { useGetGameCharactersInventoriesQuery } from '@/entities/game/model/query/game.query';
import { useQueryClient } from '@tanstack/react-query';

interface InventorieFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InventoriesModal = ({ isOpen, onClose }: InventorieFormProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetGameCharactersInventoriesQuery(isOpen);
  const { mutateAsync } = useGameCharacterEquipItemMutation();

  const handleEquipItemClick = async (pName: string) => {
    try {
      const response = await mutateAsync({ name: pName });
      if (response.data.status === API_CONSTANTS.CODE.OK) {
        queryClient.invalidateQueries({ queryKey: ['characterStatus'] });
        queryClient.invalidateQueries({ queryKey: ['characterInventories'] });
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog open={isOpen}>
      {!isLoading && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>인벤토리</AlertDialogTitle>
          </AlertDialogHeader>
          {data?.data?.result?.map((item) => {
            return (
              <div key={item.name} className="mb-4 p-3 border rounded-lg">
                {item.itemCategory === 'WEAPON' && (
                  <div onClick={() => handleEquipItemClick(item.name)}>
                    <div className="font-bold text-lg">{item.name} (무기)</div>
                    <div className="text-gray-600 mb-2">{item.description}</div>
                    <div>공격력: {item.atk}</div>
                    <div>속도: {item.speed}</div>
                    <div>크리티컬: {item.crit}</div>
                    <div>스턴: {item.stun}</div>
                    <div>정확도: {item.accuracy}</div>
                  </div>
                )}

                {item.itemCategory === 'DEFENCE' && (
                  <div onClick={() => handleEquipItemClick(item.name)}>
                    <div className="font-bold text-lg">{item.name} (방어구)</div>
                    <div className="text-gray-600 mb-2">{item.description}</div>
                    <div>방어력: {item.def}</div>
                    <div>속도: {item.speed}</div>
                    <div>회피: {item.evasion}</div>
                  </div>
                )}

                {item.itemCategory === 'ACCESSORY' && (
                  <div onClick={() => handleEquipItemClick(item.name)}>
                    <div className="font-bold text-lg">{item.name} (악세서리)</div>
                    <div className="text-gray-600 mb-2">{item.description}</div>
                    <div>속도: {item.speed}</div>
                    <div>크리티컬: {item.crit}</div>
                    <div>스턴: {item.stun}</div>
                    <div>회피: {item.evasion}</div>
                    <div>정확도: {item.accuracy}</div>
                  </div>
                )}

                <div className="mt-2 text-sm text-gray-500">등급: {item.grade}</div>
              </div>
            );
          })}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={onClose}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default InventoriesModal;
