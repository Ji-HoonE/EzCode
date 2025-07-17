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
import { useGetGameCharactersSkillsQuery } from '@/entities/game/model/query/game.query';

interface SkillFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal = ({ isOpen, onClose }: SkillFormProps) => {
  const { data, isLoading } = useGetGameCharactersSkillsQuery(isOpen);
  return (
    <AlertDialog open={isOpen}>
      {!isLoading && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>스킬</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
            {data?.data?.result && data?.data?.result?.length > 0 ? (
              data?.data?.result?.map((item) => {
                return (
                  <div key={item.name} className="p-4 border rounded-lg">
                    <div className="font-bold text-lg">{item.name}</div>
                    <div className="text-gray-600 mb-2">{item.skillDetails}</div>
                    <div className="text-gray-600 mb-2">{item.skillEffect}</div>
                    <div className="text-gray-600 mb-2">{item.grade}</div>
                    <div className="text-gray-600 mb-2">{item.slotType}</div>
                  </div>
                );
              })
            ) : (
              <div>스킬이 없습니다.</div>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={onClose}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default SkillModal;
