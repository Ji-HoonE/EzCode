import { Button } from '@/components/ui/button';
import { IGetGameCharactersAdventureChoiceResponse } from '@/api/service/game/game.interface';

interface IAdventureResultProps {
  adventureResult: IGetGameCharactersAdventureChoiceResponse;
  onBack: () => void;
}

const AdventureResult = (props: IAdventureResultProps) => {
  const { adventureResult, onBack } = props;
  return (
    <div className="space-y-4">
      <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
        <div className="flex gap-3 items-center mb-5">
          <h4 className="text-white">결과</h4>
          <div
            className={`${
              adventureResult.isPositive
                ? 'bg-[#1a4d2e] text-[#4ade80]'
                : 'bg-[#4d1a1a] text-[#f87171]'
            } p-1 rounded-[10px] w-[50px] flex justify-center items-center`}
          >
            <p className="text-sm">{adventureResult.isPositive ? '성공' : '실패'}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a2332] to-[#0c151c] p-6 rounded-[15px] shadow-lg">
          <p className="text-[#ccc] text-[15px] mb-4">{adventureResult.log}</p>
        </div>
      </div>
      <Button
        onClick={onBack}
        className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] py-2 transition-all duration-200"
      >
        다시 모험하기
      </Button>
    </div>
  );
};

export default AdventureResult;
