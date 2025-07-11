'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetGameCharactersStatusQuery } from '@/query/game/game';
import { Util } from '@/shared/util/util';

interface StatusFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatusModal = ({ isOpen, onClose }: StatusFormProps) => {
  const { data, isLoading } = useGetGameCharactersStatusQuery(isOpen);

  Util.ServerLog(data);

  return (
    <AlertDialog open={isOpen}>
      {!isLoading && (
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>상태창</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid grid-cols-3 gap-6 w-[1200px]">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="text-lg font-bold mb-2">캐릭터 정보</div>
                  <div>닉네임: {data?.data?.result?.name}</div>
                  <div>보유 골드: {data?.data?.result?.gold}</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-lg font-bold mb-2">문제해결 능력치</div>
                  {Object.entries(data?.data?.result?.stats || {}).map(([name, value]) => (
                    <div key={name} className="flex justify-between">
                      <span>{name}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-lg font-bold mb-2">게임 캐릭터 실제 능력치</div>
                  {Object.entries(data?.data?.result?.realStat || {}).map(([name, value]) => (
                    <div key={name} className="flex justify-between">
                      <span>{name}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 오른쪽 섹션: 장착 아이템 */}
              <div className="space-y-4">
                <div className="text-lg font-bold">장착 아이템</div>
                <div className="space-y-4 pr-2">
                  {data?.data?.result?.items?.map((item) => (
                    <div key={item.name} className="p-4 border rounded-lg">
                      {item.itemCategory === 'WEAPON' && (
                        <div>
                          <div className="font-bold text-lg">{item.name} (무기)</div>
                          <div className="text-gray-600 mb-2">{item.description}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>공격력: {item.atk}</div>
                            <div>속도: {item.speed}</div>
                            <div>크리티컬: {item.crit}</div>
                            <div>스턴: {item.stun}</div>
                            <div>정확도: {item.accuracy}</div>
                          </div>
                        </div>
                      )}

                      {item.itemCategory === 'DEFENCE' && (
                        <div>
                          <div className="font-bold text-lg">{item.name} (방어구)</div>
                          <div className="text-gray-600 mb-2">{item.description}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>방어력: {item.def}</div>
                            <div>속도: {item.speed}</div>
                            <div>회피: {item.evasion}</div>
                          </div>
                        </div>
                      )}

                      {item.itemCategory === 'ACCESSORY' && (
                        <div>
                          <div className="font-bold text-lg">{item.name} (악세서리)</div>
                          <div className="text-gray-600 mb-2">{item.description}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>속도: {item.speed}</div>
                            <div>크리티컬: {item.crit}</div>
                            <div>스턴: {item.stun}</div>
                            <div>회피: {item.evasion}</div>
                            <div>정확도: {item.accuracy}</div>
                          </div>
                        </div>
                      )}

                      <div className="mt-2 text-sm text-gray-500">등급: {item.grade}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-lg font-bold">스킬</div>
                <div className="space-y-4 pr-2">
                  {data?.data?.result?.skills && data?.data?.result?.skills.length > 0 ? (
                    data?.data?.result?.skills?.map((item) => (
                      <div key={item.name}>{item.name}</div>
                    ))
                  ) : (
                    <div>스킬이 없습니다.</div>
                  )}
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
              <AlertDialogAction onClick={onClose}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      )}
    </AlertDialog>
  );
};

export default StatusModal;
