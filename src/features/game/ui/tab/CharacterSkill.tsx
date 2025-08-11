import { useGetGameCharactersSkillsQuery } from '@/entities/game/model/query/game.query';
import { MenuType } from '../GameModal';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  getGradeBgColor,
  getGradeBorderColor,
  getGradeColor,
  getGradeDisplayName,
  getGradeGlowColor,
  getGradeHoverBgColor,
  getGradeHoverOverlayColor,
  getGradeStarCount,
} from '../../utils/gameUtil';
import { useGameCharacterEquipSkillMutation } from '@/entities/game/model/mutation/game.mutation';
import { toast } from 'sonner';
import { API_CONSTANTS } from '@/api/constants/api.constants';

interface ICharacterSkillProps {
  activeMenu: MenuType;
}

const CharacterSkill = (props: ICharacterSkillProps) => {
  const { activeMenu } = props;
  const [skillPage, setSkillPage] = useState(0);
  const { data, isLoading } = useGetGameCharactersSkillsQuery(activeMenu === 'skills');
  const { mutateAsync } = useGameCharacterEquipSkillMutation();

  const handleEquipItemClick = async (pName: string) => {
    try {
      const response = await mutateAsync({ name: pName, slotNumber: 3 });
      if (response.data.status === API_CONSTANTS.CODE.OK) {
        toast.success(response.data.message, {
          richColors: false,
          style: {
            background: '#00d084',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const skillsPerPage = 6;

  const { totalPages, currentSkills } = useMemo(() => {
    const totalItems = data?.data?.result?.length ?? 0;
    const totalPages = Math.ceil(totalItems / skillsPerPage);
    const startIndex = skillPage * skillsPerPage;
    const currentSkills = data?.data?.result?.slice(startIndex, startIndex + skillsPerPage);
    return {
      totalPages,
      currentSkills,
    };
  }, [data?.data?.result, skillPage]);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#00d084] text-lg font-bold">보유 스킬</h3>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setSkillPage(Math.max(0, skillPage - 1))}
            disabled={skillPage === 0}
            className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px]"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-[#ccc] text-sm">
            {skillPage + 1} / {Math.max(1, totalPages)}
          </span>
          <Button
            onClick={() => setSkillPage(Math.min(totalPages - 1, skillPage + 1))}
            disabled={skillPage >= totalPages - 1}
            className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px]"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#00d084] border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3 h-full auto-rows-fr">
            {Array.from({ length: skillsPerPage }).map((_, i) => {
              const skill = currentSkills?.[i];
              return (
                <div
                  key={i}
                  className={`h-full rounded-[10px] p-3 flex flex-col text-xs gap-2 relative group transition-all duration-200 ${
                    skill
                      ? `${getGradeBgColor(skill.grade)} ${getGradeBorderColor(skill.grade)} border ${getGradeGlowColor(skill.grade)} shadow-lg ${getGradeHoverBgColor(skill.grade)}`
                      : 'bg-[#0c151c] border border-[#214d35] hover:bg-[#0a0f14]'
                  }`}
                >
                  {skill ? (
                    <>
                      <div className="transition-opacity duration-200 group-hover:opacity-30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="w-4 h-4 text-purple-400 mr-2" />
                            <span className="text-white font-bold text-sm truncate">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`w-3 h-3 ${
                                  starIndex < getGradeStarCount(skill.grade)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div
                          className={`text-center font-bold text-xs ${getGradeColor(skill.grade)}`}
                        >
                          {getGradeDisplayName(skill.grade)}
                        </div>
                        <div className={`text-center font-bold text-xs`}>{skill.skillEffect}</div>
                        <div className="bg-[#0c151c]/50 p-2 rounded-[6px] flex-1 mt-3">
                          <div className="text-[#888] text-xs mb-1">스킬 설명</div>
                          <div className="text-white font-semibold text-xs leading-relaxed">
                            {skill.skillDetails}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`absolute inset-0 flex items-center justify-center rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${getGradeHoverOverlayColor(skill.grade)}`}
                      >
                        <Button
                          onClick={() => handleEquipItemClick(skill.name)}
                          className="bg-[#00d084] hover:bg-[#00b874] text-white font-bold px-4 py-2 rounded-[8px] transition-all duration-200"
                        >
                          스킬 장착
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-[#888]">
                      빈 슬롯
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSkill;
