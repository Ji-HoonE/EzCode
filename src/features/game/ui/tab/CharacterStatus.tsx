'use client';
import { Button } from '@/components/ui/button';
import { useGetGameCharactersStatusQuery } from '@/entities/game/model/query/game.query';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import { MenuType } from '../GameModal';
import {
  getGradeBgColor,
  getGradeBorderColor,
  getGradeColor,
  getGradeDisplayName,
  getGradeGlowColor,
  getGradeStarCount,
} from '../../utils/gameUtil';

interface ICharacterStatusProps {
  activeMenu: MenuType;
}

const CharacterStatus = (props: ICharacterStatusProps) => {
  const { activeMenu } = props;
  const [statusPage, setStatusPage] = useState(0);
  const { data, isLoading } = useGetGameCharactersStatusQuery(activeMenu === 'status');

  return (
    <div className="h-full flex flex-col relative">
      {isLoading ? (
        <div className="animate-spin w-8 h-8 border-2 border-[#00d084] border-t-transparent rounded-full mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#00d084] text-lg font-bold">캐릭터 상태</h3>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setStatusPage(Math.max(0, statusPage - 1))}
                disabled={statusPage === 0}
                className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-[#ccc] text-sm">{statusPage + 1} / 3</span>
              <Button
                onClick={() => setStatusPage(Math.min(2, statusPage + 1))}
                disabled={statusPage === 2}
                className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {statusPage === 0 && (
              <div className="space-y-6">
                <div>
                  <div className="grid grid-cols-3 gap-3">
                    {data?.data?.result?.stats &&
                      Object.keys(data.data.result.stats).length > 0 &&
                      Object.entries(data?.data?.result?.stats).map(([name, value]) => (
                        <div
                          key={name}
                          className="flex justify-between bg-gradient-to-br from-[#1a2332] to-[#0c151c] p-3 rounded-[10px] border border-[#214d35] shadow-lg"
                        >
                          <span className="text-[#ccc] text-sm">{name}</span>
                          <span className="text-white font-bold">{value}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#00d084] font-bold mb-3">게임 캐릭터 능력치</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {data?.data?.result?.realStat &&
                      Object.keys(data.data.result.realStat).length > 0 &&
                      Object.entries(data?.data?.result?.realStat).map(([name, value]) => (
                        <div
                          key={name}
                          className="flex justify-between bg-gradient-to-br from-[#1a2332] to-[#0c151c] p-3 rounded-[10px] border border-[#214d35] shadow-lg"
                        >
                          <span className="text-[#ccc] text-sm">{name.toUpperCase()}</span>
                          <span className="text-white font-bold">{value}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {statusPage === 1 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#00d084] font-bold mb-3">보유 골드</h4>
                  <div className="text-2xl text-white font-bold">
                    {`${data?.data?.result?.gold}`} Gold
                  </div>
                </div>

                <div>
                  <h4 className="text-[#00d084] font-bold mb-3">장착 아이템</h4>
                  <div className="space-y-3 h-full max-h-[340px] overflow-y-auto scrollbar-hidden">
                    {data?.data?.result?.items?.map((item, idx) => (
                      <div
                        className={`p-3 rounded-[10px] border shadow-lg ${getGradeBgColor(item.grade)} ${getGradeBorderColor(item.grade)} ${getGradeGlowColor(item.grade)}`}
                        key={idx}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-bold ${getGradeColor(item.grade)}`}>
                            {item.name}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < getGradeStarCount(item.grade)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className={`text-sm mb-1 font-semibold ${getGradeColor(item.grade)}`}>
                          등급: {getGradeDisplayName(item.grade)}
                        </div>
                        <div className="text-xs text-[#ccc]">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {statusPage === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#00d084] font-bold mb-3">장착 스킬</h4>
                  <div className="space-y-3">
                    <div className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">파이어볼</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[#888] text-sm">슬롯 1</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < 3 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-blue-400 mb-1 font-semibold">등급: UNCOMMON</div>
                      <div className="text-xs text-[#888]">
                        강력한 화염구를 발사하여 적에게 큰 피해를 입힙니다.
                      </div>
                    </div>

                    <div className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">힐링</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[#888] text-sm">슬롯 2</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < 2 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-green-400 mb-1 font-semibold">등급: COMMON</div>
                      <div className="text-xs text-[#888]">
                        체력을 회복하여 전투 지속력을 높입니다.
                      </div>
                    </div>

                    <div className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35] opacity-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#888]">빈 슬롯</span>
                        <span className="text-[#888] text-sm">슬롯 3</span>
                      </div>
                      <div className="text-xs text-[#888]">스킬을 장착할 수 있습니다.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterStatus;
