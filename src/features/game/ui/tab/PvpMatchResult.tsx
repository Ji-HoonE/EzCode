import { Button } from '@/components/ui/button';
import { MenuType } from '../GameModal';
import { IGetGameCharactersPvpMatchingAcceptResponse } from '@/api/service/game/game.interface';

interface IPvpMatchResultProps {
  activeMenu: MenuType;
  pvpSubMenu: 'main' | 'found' | 'defence' | 'result';
  onBack: () => void;
  matchResult: IGetGameCharactersPvpMatchingAcceptResponse | null;
}

const PvpMatchResult = (props: IPvpMatchResultProps) => {
  const { onBack, matchResult } = props;
  // 무승부인지 확인하는 함수
  const isDraw = () => {
    if (!matchResult?.battleLog || matchResult.battleLog.length === 0) return false;
    const lastLog = matchResult.battleLog[matchResult.battleLog.length - 1];
    return lastLog.includes('무승부') || lastLog.includes('양쪽 모두 살아남았습니다');
  };

  // 결과 상태 결정
  const getResultStatus = () => {
    if (matchResult?.isPlayerWin) return 'win';
    if (isDraw()) return 'draw';
    return 'lose';
  };

  const resultStatus = getResultStatus();

  const getResultConfig = () => {
    switch (resultStatus) {
      case 'win':
        return {
          badge: { bg: 'bg-green-600', text: '승리' },
          playerColor: 'text-green-400',
          enemyColor: 'text-red-400',
        };
      case 'lose':
        return {
          badge: { bg: 'bg-red-600', text: '패배' },
          playerColor: 'text-red-400',
          enemyColor: 'text-green-400',
        };
      case 'draw':
        return {
          badge: { bg: 'bg-yellow-600', text: '무승부' },
          playerColor: 'text-yellow-400',
          enemyColor: 'text-yellow-400',
        };
      default:
        return {
          badge: { bg: 'bg-gray-600', text: '알 수 없음' },
          playerColor: 'text-white',
          enemyColor: 'text-white',
        };
    }
  };

  const resultConfig = getResultConfig();

  return (
    <div className="space-y-4 h-full">
      <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`font-semibold ${resultConfig.playerColor}`}>
              {matchResult?.playerNickName}
            </div>
            <div className="text-gray-400">VS</div>
            <div className={`font-semibold ${resultConfig.enemyColor}`}>
              {matchResult?.enemyNickName}
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${resultConfig.badge.bg} text-white`}
          >
            {resultConfig.badge.text}
          </div>
        </div>

        {/* 배틀 로그 */}
        <div className="space-y-2 border-t border-[#214d35] pt-4">
          {matchResult?.battleLog.map((log, index) => (
            <div key={index} className="text-white text-sm">
              {log}
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={onBack}
        className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
      >
        <div className="flex items-center">
          <span>다시 매칭하기</span>
        </div>
        <span className="text-[#00d084]">→</span>
      </Button>
    </div>
  );
};

export default PvpMatchResult;
