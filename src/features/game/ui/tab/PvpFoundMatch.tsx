import { Button } from '@/components/ui/button';
import { useGetGameCharactersPvpMatchingQuery } from '@/entities/game/model/query/game.query';
import { MenuType } from '../GameModal';
import { useGetGameCharactersPvpMatchingAcceptQuery } from '@/entities/game/model/mutation/game.mutation';
import { IGetGameCharactersPvpMatchingAcceptResponse } from '@/api/service/game/game.interface';

interface IPvpFoundMatchProps {
  activeMenu: MenuType;
  onBack: () => void;
  onSuccess: () => void;
  pvpSubMenu: 'main' | 'found' | 'defence';
  setMatchResult: (result: IGetGameCharactersPvpMatchingAcceptResponse) => void;
}

const PvpFoundMatch = (props: IPvpFoundMatchProps) => {
  const { activeMenu, onBack, onSuccess, pvpSubMenu, setMatchResult } = props;
  const { data, isLoading } = useGetGameCharactersPvpMatchingQuery(
    activeMenu === 'pvp' && pvpSubMenu === 'found'
  );

  const { mutateAsync } = useGetGameCharactersPvpMatchingAcceptQuery();

  const handleAcceptClick = async () => {
    try {
      if (!data?.data?.result?.enemyIdToken) return;
      const res = await mutateAsync({
        battleToken: data?.data?.result?.enemyIdToken,
      });
      setMatchResult(res.data.result);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <div className="animate-spin w-8 h-8 border-2 border-[#00d084] border-t-transparent rounded-full mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    );
  }

  return (
    <div className="space-y-4 h-full">
      <Button
        onClick={onBack}
        className="text-[#00d084] hover:text-white bg-transparent hover:bg-[rgba(255,255,255,0.08)] rounded-[10px] p-2 transition-all duration-200"
      >
        ← 뒤로가기
      </Button>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-[#ccc] mb-4">상대를 찾았습니다!</p>
        </div>

        <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
          {data?.data?.result?.message}
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={handleAcceptClick}
            className="flex-1 bg-[#00d084] hover:bg-[#00b070] text-white rounded-[10px] py-3 transition-all duration-200"
          >
            수락
          </Button>
          <Button
            onClick={onBack}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-[10px] py-3 transition-all duration-200"
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PvpFoundMatch;
