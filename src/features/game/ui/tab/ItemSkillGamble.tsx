import { Button } from '@/components/ui/button';
import { Shield, Zap } from 'lucide-react';
import { Star } from 'lucide-react';
import { Sword } from 'lucide-react';
import { useState } from 'react';
import {
  IGetGameCharactersItemGamblingResponse,
  IGetGameCharactersSkillGamblingResponse,
} from '@/api/service/game/game.interface';
import ItemSkillGambleResult from './ItemSkillGambleResult';
import {
  useGetGameCharactersItemGamblingQuery,
  useGetGameCharactersSkillGamblingQuery,
} from '@/entities/game/model/mutation/game.mutation';
import { API_CONSTANTS } from '@/api/constants/api.constants';

type GAMBLE_STEP = 'shop' | 'category' | 'result';

const CATEGORIES = [
  {
    id: 'weapon',
    name: 'WEAPON (무기)',
    icon: Sword,
    iconColor: '',
  },
  {
    id: 'defence',
    name: 'DEFENSE (방어구)',
    icon: Shield,
    iconColor: '',
  },
  {
    id: 'accessory',
    name: 'ACCESSORY (장신구)',
    icon: Star,
    iconColor: '',
  },
  {
    id: 'skill',
    name: 'SKILL (스킬)',
    icon: Zap,
    iconColor: 'text-purple-400',
  },
] as const;

const CATEGORY_DISPLAY_NAMES = {
  weapon: '무기 뽑기',
  defence: '방어구 뽑기',
  accessory: '장신구 뽑기',
  skill: '스킬 뽑기',
} as const;

const ItemSkillGamble = () => {
  /** 아이템 무기 뽑기 뮤테이션 */
  const { mutateAsync } = useGetGameCharactersItemGamblingQuery();
  /** 아이템 스킬 뽑기 뮤테이션 */
  const { mutateAsync: mutateAsyncSkill } = useGetGameCharactersSkillGamblingQuery();
  /** 아이템 무기 뽑기 결과 */
  const [gambleItemResult, setGambleItemResult] =
    useState<IGetGameCharactersItemGamblingResponse | null>(null);
  /** 아이템 스킬 뽑기 결과 */
  const [gambleSkillResult, setGambleSkillResult] =
    useState<IGetGameCharactersSkillGamblingResponse | null>(null);

  /** 뽑기 단계 */
  const [gambleStep, setGambleStep] = useState<GAMBLE_STEP>('shop');

  /** 선택한 카테고리 */
  const [selectedCategory, setSelectedCategory] = useState<
    'weapon' | 'defence' | 'accessory' | 'skill' | string
  >('');

  /** 카테고리 클릭 함수 */
  const handleCategoryClick = (category: string) => {
    setGambleStep('category');
    setSelectedCategory(category);
  };

  /** 아이템 뽑기 클릭 함수 */
  const handleGambleItemClick = async () => {
    try {
      const response = await mutateAsync({ itemCategory: selectedCategory });
      if (response.status === API_CONSTANTS.CODE.CREATED) {
        setGambleItemResult(response.result);
        setGambleStep('result');
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 스킬 뽑기 클릭 함수 */
  const handleGambleSkill = async () => {
    try {
      const response = await mutateAsyncSkill();
      if (response.data.status === API_CONSTANTS.CODE.CREATED) {
        setGambleSkillResult(response.data.result);
        setGambleStep('result');
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 뒤로가기 클릭 함수 */
  const handleBack = () => {
    setGambleStep('shop');
    setSelectedCategory('');
    setGambleItemResult(null);
    setGambleSkillResult(null);
  };

  return (
    <div className="space-y-4 relative h-full">
      <h3 className="text-[#00d084] text-lg font-bold">아이템/스킬 뽑기</h3>
      {gambleStep === 'shop' && (
        <div className="space-y-4">
          <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
            <h4 className="text-white mb-2">상점 안내</h4>
            <p className="text-[#ccc] text-sm mb-3">
              다양한 카테고리의 아이템과 스킬을 획득할 수 있습니다. 각 카테고리마다 고유한
              아이템들이 준비되어 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            {CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex items-center">
                    <IconComponent className={`w-5 h-5 mr-3 ${category.iconColor}`} />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-[#00d084]">→</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {gambleStep === 'category' && selectedCategory && (
        <div className="space-y-4">
          <Button
            onClick={handleBack}
            className="text-[#00d084] hover:text-white bg-transparent hover:bg-[rgba(255,255,255,0.08)] rounded-[10px] p-2 transition-all duration-200"
          >
            ← 뒤로가기
          </Button>

          <div className="text-center">
            <h4 className="text-white text-lg mb-4">
              {CATEGORY_DISPLAY_NAMES[selectedCategory as keyof typeof CATEGORY_DISPLAY_NAMES]}
            </h4>
            <p className="text-[#ccc] mb-6">어떤 아이템과 스킬을 뽑을까요?</p>

            <Button
              onClick={selectedCategory === 'skill' ? handleGambleSkill : handleGambleItemClick}
              className="bg-[#00d084] hover:bg-[#00b070] text-white rounded-[10px] px-8 py-3 text-lg transition-all duration-200"
            >
              뽑기 시작!
            </Button>
          </div>
        </div>
      )}

      {gambleStep === 'result' && selectedCategory && (
        <ItemSkillGambleResult
          itemData={selectedCategory !== 'skill' ? gambleItemResult : null}
          skillData={selectedCategory === 'skill' ? gambleSkillResult : null}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default ItemSkillGamble;
