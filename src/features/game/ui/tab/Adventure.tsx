import { Button } from '@/components/ui/button';
import { useGetGameCharactersAdventureQuery } from '@/entities/game/model/query/game.query';
import { useState } from 'react';
import { MenuType } from '../GameModal';
import { useGetGameCharactersAdventureChoiceQuery } from '@/entities/game/model/mutation/game.mutation';
import { IGetGameCharactersAdventureChoiceResponse } from '@/api/service/game/game.interface';
import AdventureResult from './AdventureResult';
import { API_CONSTANTS } from '@/api/constants/api.constants';

interface IAdventureProps {
  activeMenu: MenuType;
}

const Adventure = (props: IAdventureProps) => {
  const { activeMenu } = props;
  const [adventureStep, setAdventureStep] = useState<'main' | 'choices' | 'result'>('main');
  const [adventureResult, setAdventureResult] =
    useState<IGetGameCharactersAdventureChoiceResponse | null>(null);

  const { data, isLoading } = useGetGameCharactersAdventureQuery(
    activeMenu === 'adventure' && adventureStep === 'choices'
  );
  const { mutateAsync } = useGetGameCharactersAdventureChoiceQuery();

  const handleChoiceClick = async (choice: boolean) => {
    try {
      const response = await mutateAsync({
        encounterToken: data?.data?.result?.encounterId || '',
        playerDecision: choice,
      });
      setAdventureResult(response?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="space-y-4">
        <h3 className="text-[#00d084] text-lg font-bold">어드벤처</h3>
        {isLoading ? (
          <div className="animate-spin w-8 h-8 border-2 border-[#00d084] border-t-transparent rounded-full mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        ) : (
          <>
            {adventureStep === 'main' && (
              <div className="space-y-4">
                <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
                  <h4 className="text-white mb-2">어드벤처 안내</h4>
                  <p className="text-[#ccc] text-sm">
                    신비로운 모험을 떠나보세요. 당신의 선택에 따라 다양한 결과를 얻을 수 있습니다.
                  </p>
                </div>

                <Button
                  onClick={() => setAdventureStep('choices')}
                  className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200"
                >
                  모험 시작
                </Button>
              </div>
            )}

            {adventureStep === 'choices' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setAdventureStep('main')}
                  className="text-[#00d084] hover:text-white bg-transparent hover:bg-[rgba(255,255,255,0.08)] rounded-[10px] p-2 transition-all duration-200"
                >
                  ← 뒤로가기
                </Button>
                {data?.data?.status === API_CONSTANTS.CODE.BAD_REQUEST &&
                  data?.data?.message ===
                    '인카운터 매칭 토큰을 전부 소진했습니다. 6 시간 이후 리필됩니다.' && (
                    <div className="bg-[#0c151c] p-4 rounded-[10px] border border-red-500">
                      <h4 className="text-red-400 mb-2">어드벤처 불가</h4>
                      <p className="text-[#ccc] text-sm">{data?.data?.message}</p>
                    </div>
                  )}

                {data?.data?.result && (
                  <>
                    <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
                      <h4 className="text-white mb-3">{data?.data?.result?.name}</h4>
                      <p className="text-[#ccc] text-sm mb-4">
                        {data?.data?.result?.encounterText}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => {
                          handleChoiceClick(true);
                          setAdventureStep('result');
                        }}
                        className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-9 transition-all duration-200 text-left"
                      >
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            <span>{data?.data?.result?.choice1Text}</span>
                            <span className="text-[#888] text-lg">→</span>
                          </div>
                        </div>
                      </Button>

                      <Button
                        onClick={() => {
                          handleChoiceClick(false);
                          setAdventureStep('result');
                        }}
                        className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-9 transition-all duration-200 text-left"
                      >
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            <span>{data?.data?.result?.choice2Text}</span>
                            <span className="text-[#888] text-xl">→</span>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
            {adventureStep === 'result' && adventureResult && (
              <AdventureResult
                adventureResult={adventureResult}
                onBack={() => {
                  setAdventureStep('main');
                  setAdventureResult(null);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Adventure;
