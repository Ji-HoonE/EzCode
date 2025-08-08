'use client';
import { Button } from '@/components/ui/button';
import { useGetGameCharactersStatusQuery } from '@/entities/game/model/query/game.query';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Shield,
  Heart,
  Target,
  TrendingUp,
  Sword,
  LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { MenuType } from '../GameModal';
import {
  getGradeBgColor,
  getGradeBorderColor,
  getGradeColor,
  getGradeDisplayName,
  getGradeGlowColor,
  getGradeHoverOverlayColor,
  getGradeStarCount,
} from '../../utils/gameUtil';
import { useGameCharacterUnEquipSkillMutation } from '@/entities/game/model/mutation/game.mutation';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import { toast } from 'sonner';

interface ICharacterStatusProps {
  activeMenu: MenuType;
}

const CharacterStatus = (props: ICharacterStatusProps) => {
  const { activeMenu } = props;
  const [statusPage, setStatusPage] = useState(0);
  const { data, isLoading, refetch } = useGetGameCharactersStatusQuery(activeMenu === 'status');
  const { mutateAsync } = useGameCharacterUnEquipSkillMutation();

  const handleUnEquipSkillClick = async (pName: string) => {
    try {
      const response = await mutateAsync({ name: pName });
      if (response.data.status === API_CONSTANTS.CODE.OK) {
        toast.success(response.data.message, {
          richColors: false,
          style: {
            background: '#ff0000',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
          },
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatIcon = (statName: string) => {
    const iconMap: { [key: string]: LucideIcon } = {
      hp: Heart,
      mp: Zap,
      defense: Shield,
      attack: Sword,
      critical: Target,
      speed: TrendingUp,
    };
    return iconMap[statName.toLowerCase()] || TrendingUp;
  };

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
                {/* 기본 스탯 */}
                <div className="p-6 rounded-[15px] border border-[#214d35] shadow-xl">
                  <h4 className="text-[#00d084] font-bold mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>기본 스탯</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {data?.data?.result?.stats &&
                      Object.keys(data.data.result.stats).length > 0 &&
                      Object.entries(data?.data?.result?.stats).map(([name, value]) => {
                        const IconComponent = getStatIcon(name);
                        return (
                          <div
                            key={name}
                            className="group bg-gradient-to-br from-[#1a2332] to-[#0c151c] p-4 rounded-[12px] border border-[#214d35] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#00d084]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <IconComponent className="w-4 h-4 text-[#00d084]" />
                              <span className="text-[#ccc] text-xs font-medium">{name}</span>
                            </div>
                            <span className="text-white font-bold text-lg group-hover:text-[#00d084] transition-colors duration-200">
                              {value}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* 게임 캐릭터 능력치 */}
                <div className="bg-gradient-to-br from-[#0c151c] to-[#1a2332] p-6 rounded-[15px] border border-[#214d35] shadow-xl">
                  <h4 className="text-[#00d084] font-bold mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>게임 캐릭터 능력치</span>
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {data?.data?.result?.realStat &&
                      Object.keys(data.data.result.realStat).length > 0 &&
                      Object.entries(data?.data?.result?.realStat).map(([name, value]) => {
                        const IconComponent = getStatIcon(name);
                        return (
                          <div
                            key={name}
                            className="group bg-gradient-to-br from-[#1a2332] to-[#0c151c] p-3 rounded-[12px] border border-[#214d35] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#00d084]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <IconComponent className="w-3 h-3 text-[#00d084]" />
                              <span className="text-[#ccc] text-xs font-medium">
                                {name.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-white font-bold text-base group-hover:text-[#00d084] transition-colors duration-200">
                              {value}
                            </span>
                          </div>
                        );
                      })}
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
                  <h4 className="text-[#00d084] font-bold mb-3">
                    장착 스킬
                    <span className="text-xs text-[#888] ml-2">
                      {data?.data?.result?.skills.length} / 3
                    </span>
                  </h4>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, idx) => {
                      const skill = data?.data?.result?.skills?.[idx];

                      if (skill) {
                        return (
                          <div
                            className={`relative group p-3 rounded-[10px] border shadow-lg ${getGradeBgColor(skill.grade)} ${getGradeBorderColor(skill.grade)} ${getGradeGlowColor(skill.grade)}`}
                            key={idx}
                          >
                            <div className="transition-opacity duration-200 group-hover:opacity-30">
                              <div className="flex justify-between items-center mb-2">
                                <span className={`font-bold ${getGradeColor(skill.grade)}`}>
                                  {skill.name}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[#888] text-sm">슬롯 {idx + 1}</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < getGradeStarCount(skill.grade)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-600'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`text-sm mb-1 font-semibold ${getGradeColor(skill.grade)}`}
                              >
                                등급: {getGradeDisplayName(skill.grade)}
                              </div>
                              <div className="text-xs text-[#ccc]">{skill.skillDetails}</div>
                            </div>
                            <div
                              className={`absolute inset-0 rounded-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${getGradeHoverOverlayColor(skill.grade)}`}
                            >
                              <Button
                                onClick={() => handleUnEquipSkillClick(skill.name)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                              >
                                장착해제
                              </Button>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35] opacity-50"
                            key={idx}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#888]">빈 슬롯</span>
                              <span className="text-[#888] text-sm">슬롯 {idx + 1}</span>
                            </div>
                            <div className="text-xs text-[#888]">스킬을 장착할 수 있습니다.</div>
                          </div>
                        );
                      }
                    })}
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
