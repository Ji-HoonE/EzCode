import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { Star } from 'lucide-react';
import { Sword } from 'lucide-react';
import { useState } from 'react';
import { MenuType } from '../GameModal';

interface ItemSkillGambleProps {
  activeMenu: MenuType;
}

const ItemSkillGamble = (props: ItemSkillGambleProps) => {
  const { activeMenu } = props;
  const [gachaState, setGachaState] = useState<'shop' | 'category' | 'result'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<
    'weapon' | 'defense' | 'accessory' | null
  >(null);

  return (
    <div className="space-y-4">
      <h3 className="text-[#00d084] text-lg font-bold">아이템/스킬 뽑기</h3>

      {gachaState === 'shop' && (
        <div className="space-y-4">
          <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
            <h4 className="text-white mb-2">상점 안내</h4>
            <p className="text-[#ccc] text-sm mb-3">
              다양한 카테고리의 아이템과 스킬을 획득할 수 있습니다. 각 카테고리마다 고유한
              아이템들이 준비되어 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                setGachaState('category');
                setSelectedCategory('weapon');
              }}
              className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center">
                <Sword className="w-5 h-5 mr-3" />
                <span>WEAPON (무기)</span>
              </div>
              <span className="text-[#00d084]">→</span>
            </Button>

            <Button
              onClick={() => {
                setGachaState('category');
                setSelectedCategory('defense');
              }}
              className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-3" />
                <span>DEFENSE (방어구)</span>
              </div>
              <span className="text-[#00d084]">→</span>
            </Button>

            <Button
              onClick={() => {
                setGachaState('category');
                setSelectedCategory('accessory');
              }}
              className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-3" />
                <span>ACCESSORY (장신구)</span>
              </div>
              <span className="text-[#00d084]">→</span>
            </Button>
          </div>
        </div>
      )}

      {gachaState === 'category' && selectedCategory && (
        <div className="space-y-4">
          <Button
            onClick={() => setGachaState('shop')}
            className="text-[#00d084] hover:text-white bg-transparent hover:bg-[rgba(255,255,255,0.08)] rounded-[10px] p-2 transition-all duration-200"
          >
            ← 뒤로가기
          </Button>

          <div className="text-center">
            <h4 className="text-white text-lg mb-4">
              {selectedCategory === 'weapon' && '무기 뽑기'}
              {selectedCategory === 'defense' && '방어구 뽑기'}
              {selectedCategory === 'accessory' && '장신구 뽑기'}
            </h4>
            <p className="text-[#ccc] mb-6">100 골드가 소모됩니다.</p>

            <Button
              onClick={() => setGachaState('result')}
              className="bg-[#00d084] hover:bg-[#00b070] text-white rounded-[10px] px-8 py-3 text-lg transition-all duration-200"
            >
              뽑기 시작!
            </Button>
          </div>
        </div>
      )}

      {gachaState === 'result' && selectedCategory && (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-[#00d084] text-lg mb-4">뽑기 결과</h4>

            <div className="bg-[#0c151c] p-6 rounded-[10px] border border-[#214d35] mb-4">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-white font-bold text-lg mb-2">
                {selectedCategory === 'weapon' && '전설의 검'}
                {selectedCategory === 'defense' && '드래곤 갑옷'}
                {selectedCategory === 'accessory' && '마법 목걸이'}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-[#ccc] text-sm">레어 등급</div>
            </div>

            <Button
              onClick={() => {
                setGachaState('shop');
                setSelectedCategory(null);
              }}
              className="bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] px-6 py-2 transition-all duration-200"
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemSkillGamble;
