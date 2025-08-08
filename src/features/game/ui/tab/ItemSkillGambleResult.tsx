import {
  IGetGameCharactersItemGamblingResponse,
  IGetGameCharactersSkillGamblingResponse,
} from '@/api/service/game/game.interface';
import { Button } from '@/components/ui/button';
import { Star, Sword, Shield, Zap } from 'lucide-react';
import {
  getGradeBgColor,
  getGradeBorderColor,
  getGradeColor,
  getGradeDisplayName,
  getGradeGlowColor,
  getGradeStarCount,
} from '@/features/game/utils/gameUtil';

interface IItemSkillGambleResultProps {
  itemData?: IGetGameCharactersItemGamblingResponse | null;
  skillData?: IGetGameCharactersSkillGamblingResponse | null;
  onBack: () => void;
}

const ItemSkillGambleResult = (props: IItemSkillGambleResultProps) => {
  const { itemData, skillData, onBack } = props;

  const formatMessage = (message: string) => {
    if (!message) return '';
    const parts = message.split(/(\([^)]*\))/);

    return parts.map((part, index) => {
      if (part.startsWith('(') && part.endsWith(')')) {
        return (
          <div key={index} className="text-white font-bold text-lg mb-2">
            {part}
          </div>
        );
      } else {
        return (
          <div key={index} className="text-white font-bold text-lg mb-2">
            {part}
          </div>
        );
      }
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toUpperCase()) {
      case 'WEAPON':
        return <Sword className="w-6 h-6 text-red-400" />;
      case 'DEFENCE':
        return <Shield className="w-6 h-6 text-blue-400" />;
      case 'ACCESSORY':
        return <Star className="w-6 h-6 text-yellow-400" />;
      default:
        return <Star className="w-6 h-6 text-purple-400" />;
    }
  };

  if (itemData) {
    const starCount = getGradeStarCount(itemData?.itemResponse?.grade);

    return (
      <div className="space-y-4 overflow-y-auto">
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#1a2332] to-[#0c151c] p-6 rounded-[15px] border border-[#214d35] mb-4 shadow-lg">
            <div className="text-4xl mb-4">🎉</div>
            {itemData?.message && formatMessage(itemData?.message)}

            <div className="bg-[#214d35] rounded-[10px] p-4 mb-4">
              <div className="flex items-center justify-center mb-3">
                {getCategoryIcon(itemData?.itemResponse?.itemCategory)}
                <span className="ml-2 font-bold text-xl text-[#00d084]">
                  {itemData?.itemResponse?.name}
                </span>
              </div>

              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 mx-1 ${
                      i < starCount ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <div
                className={`text-center font-bold text-lg mb-2 ${getGradeColor(itemData?.itemResponse?.grade)}`}
              >
                {getGradeDisplayName(itemData?.itemResponse?.grade)}
              </div>

              <div className="text-[#ccc] text-sm text-center mb-4">
                {itemData?.itemResponse?.description}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {itemData?.itemResponse?.itemCategory === 'WEAPON' && (
                <>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">ACCURACY</div>
                    <div className="text-white font-bold">{itemData?.itemResponse?.accuracy}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">ATK</div>
                    <div className="text-red-400 font-bold">{itemData?.itemResponse?.atk}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">CRIT</div>
                    <div className="text-yellow-400 font-bold">{itemData?.itemResponse?.crit}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">SPEED</div>
                    <div className="text-green-400 font-bold">{itemData?.itemResponse?.speed}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center col-span-2">
                    <div className="text-[#888] text-xs">STUN</div>
                    <div className="text-purple-400 font-bold">{itemData?.itemResponse?.stun}</div>
                  </div>
                </>
              )}
              {itemData?.itemResponse?.itemCategory === 'DEFENCE' && (
                <>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">ACCURACY</div>
                    <div className="text-white font-bold">{itemData?.itemResponse?.accuracy}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">DEF</div>
                    <div className="text-blue-400 font-bold">{itemData?.itemResponse?.def}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">EVASION</div>
                    <div className="text-green-400 font-bold">
                      {itemData?.itemResponse?.evasion}
                    </div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">SPEED</div>
                    <div className="text-green-400 font-bold">{itemData?.itemResponse?.speed}</div>
                  </div>
                </>
              )}
              {itemData?.itemResponse?.itemCategory === 'ACCESSORY' && (
                <>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">ACCURACY</div>
                    <div className="font-bold">{itemData?.itemResponse?.accuracy}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">CRIT</div>
                    <div className="font-bold">{itemData?.itemResponse?.crit}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">EVASION</div>
                    <div className="font-bold">{itemData?.itemResponse?.evasion}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center">
                    <div className="text-[#888] text-xs">SPEED</div>
                    <div className="font-bold">{itemData?.itemResponse?.speed}</div>
                  </div>
                  <div className="bg-[#0c151c] p-2 rounded-[8px] border border-[#214d35] text-center col-span-2">
                    <div className="text-[#888] text-xs">STUN</div>
                    <div className="font-bold">{itemData?.itemResponse?.stun}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button
            onClick={onBack}
            className="bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] px-8 py-3 transition-all duration-200 font-bold"
          >
            확인
          </Button>
        </div>
      </div>
    );
  }

  if (skillData) {
    const starCount = getGradeStarCount(skillData?.response?.grade);
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#1a2332] to-[#0c151c] p-6 rounded-[15px] border border-[#214d35] mb-4 shadow-lg">
            <div className="text-4xl mb-4">🎉</div>
            {skillData?.message && formatMessage(skillData?.message)}

            <div
              className={`rounded-[10px] p-4 mb-4 ${getGradeBgColor(skillData?.response?.grade)} ${getGradeBorderColor(skillData?.response?.grade)} ${getGradeGlowColor(skillData?.response?.grade)}`}
            >
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-purple-400" />
                <span className="ml-2 font-bold text-xl text-[#00d084]">
                  {skillData?.response?.name}
                </span>
              </div>

              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 mx-1 ${
                      i < starCount ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <div
                className={`text-center font-bold text-lg mb-2 ${getGradeColor(skillData?.response?.grade)}`}
              >
                {getGradeDisplayName(skillData?.response?.grade)}
              </div>

              <div className="text-[#ccc] text-sm text-center mb-4">
                {skillData?.response?.skillDetails}
              </div>
            </div>

            {/* 스킬 효과 */}
            <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
              <div className="text-[#888] text-sm mb-2">스킬 효과</div>
              <div className="text-white font-bold">{skillData?.response?.skillEffect}</div>
            </div>
          </div>

          <Button
            onClick={onBack}
            className="bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] px-8 py-3 transition-all duration-200 font-bold"
          >
            확인
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-spin w-8 h-8 border-2 border-[#00d084] border-t-transparent rounded-full mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
  );
};

export default ItemSkillGambleResult;
