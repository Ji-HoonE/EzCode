import { Button } from '@/components/ui/button';
import { Shield, Sword } from 'lucide-react';
import { useCallback, useState } from 'react';
import { MenuType } from '../GameModal';
import PvpHistory from './PvpHistory';
import PvpFoundMatch from './PvpFoundMatch';
import PvpMatchResult from './PvpMatchResult';
import { IGetGameCharactersPvpMatchingAcceptResponse } from '@/api/service/game/game.interface';

interface IPvpMatchProps {
  activeMenu: MenuType;
}

const PvpMatch = (props: IPvpMatchProps) => {
  const { activeMenu } = props;
  const [matchResult, setMatchResult] =
    useState<IGetGameCharactersPvpMatchingAcceptResponse | null>(null);
  const [pvpSubMenu, setPvpSubMenu] = useState<'main' | 'found' | 'defence' | 'result'>('main');

  const onBack = useCallback(() => {
    setPvpSubMenu('main');
  }, []);

  const onSuccess = () => {
    setPvpSubMenu('result');
  };

  return (
    <div className="space-y-4 h-full relative">
      <h3 className="text-[#00d084] text-lg font-bold">PVP 랜덤매칭</h3>

      {pvpSubMenu === 'main' && (
        <div className="space-y-3">
          <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
            <h4 className="text-white mb-2">PVP 랜덤매칭 안내</h4>
            <p className="text-[#ccc] text-sm">
              랜덤으로 매칭된 상대와 배틀을 시작합니다. 배틀 결과에 따라 상대의 아이템을 획득할 수
              있습니다.
            </p>
          </div>
          <Button
            onClick={() => setPvpSubMenu('found')}
            className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Sword className="w-5 h-5 mr-3" />
              <span>매칭 시작</span>
            </div>
            <span className="text-[#00d084]">→</span>
          </Button>
          <Button
            onClick={() => setPvpSubMenu('defence')}
            className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-3" />
              <span>방어 로그</span>
            </div>
            <span className="text-[#00d084]">→</span>
          </Button>
        </div>
      )}
      {pvpSubMenu === 'found' && (
        <PvpFoundMatch
          activeMenu={activeMenu}
          onBack={onBack}
          onSuccess={onSuccess}
          pvpSubMenu={pvpSubMenu}
          setMatchResult={setMatchResult}
        />
      )}
      {pvpSubMenu === 'defence' && (
        <PvpHistory activeMenu={activeMenu} pvpSubMenu={pvpSubMenu} onBack={onBack} />
      )}
      {pvpSubMenu === 'result' && (
        <PvpMatchResult
          activeMenu={activeMenu}
          pvpSubMenu={pvpSubMenu}
          onBack={onBack}
          matchResult={matchResult}
        />
      )}
    </div>
  );
};

export default PvpMatch;
