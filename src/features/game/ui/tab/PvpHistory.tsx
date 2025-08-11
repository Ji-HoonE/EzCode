import { IGetGameCharactersPvpHistoryResponse } from '@/api/service/game/game.interface';
import { Button } from '@/components/ui/button';
import { useGetGameCharactersPvpHistoryQuery } from '@/entities/game/model/query/game.query';
import { MenuType } from '../GameModal';

interface IPvpHistoryProps {
  activeMenu: MenuType;
  pvpSubMenu: 'main' | 'found' | 'defence' | 'result';
  onBack: () => void;
}

const PvpHistory = (props: IPvpHistoryProps) => {
  const { activeMenu, pvpSubMenu, onBack } = props;
  const { data, isLoading } = useGetGameCharactersPvpHistoryQuery(
    activeMenu === 'pvp' && pvpSubMenu === 'defence'
  );
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

      <h4 className="text-white">방어 기록</h4>
      {data?.data?.result && data.data.result.length > 0 ? (
        data.data.result.map((item: IGetGameCharactersPvpHistoryResponse, idx) => (
          <div key={idx} className="space-y-3">
            <div className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-400">{item.isDefenderWin ? '승리' : '패배'}</span>
                <span className="text-[#888] text-sm">{item.battleCreatedAt}</span>
              </div>
              <div className="text-sm">
                <span className="text-[#ccc]">{item.attackerNickName} </span>
                <span className="text-white">{item.PlayerNickName}</span>
              </div>
              <div className="text-sm text-[#888]">{item.battleLog}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-[#0c151c] p-6 rounded-[10px] border border-[#214d35] text-center">
          <p className="text-[#888] text-lg">방어 기록이 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default PvpHistory;
