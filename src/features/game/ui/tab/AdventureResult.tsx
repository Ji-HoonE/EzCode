import { Button } from '@/components/ui/button';

const AdventureResult = () => {
  const selectedChoice = 1;
  return (
    <div className="space-y-4">
      <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
        <h4 className="text-white mb-3">결과</h4>
        {selectedChoice === 1 ? (
          <div>
            <p className="text-[#ccc] text-sm mb-4">
              빛을 따라가니 고대 유적을 발견했습니다! 유적 안에서 신비로운 보물을 획득했습니다.
            </p>
            <div className="bg-[#214d35] p-3 rounded-[10px]">
              <div className="text-[#00d084] font-bold">보상</div>
              <div className="text-white text-sm">+ 마법 크리스탈</div>
              <div className="text-white text-sm">+ 200 경험치</div>
              <div className="text-white text-sm">+ 150 골드</div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[#ccc] text-sm mb-4">
              물소리를 따라가니 맑은 샘을 발견했습니다. 샘물을 마시고 체력과 마나가 완전히
              회복되었습니다.
            </p>
            <div className="bg-[#214d35] p-3 rounded-[10px]">
              <div className="text-[#00d084] font-bold">보상</div>
              <div className="text-white text-sm">+ HP/MP 완전 회복</div>
              <div className="text-white text-sm">+ 100 경험치</div>
              <div className="text-white text-sm">+ 체력 포션 x3</div>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={() => {}}
        className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] py-2 transition-all duration-200"
      >
        다시 모험하기
      </Button>
    </div>
  );
};

export default AdventureResult;
