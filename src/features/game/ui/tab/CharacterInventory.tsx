import { Button } from '@/components/ui/button';
import { useGetGameCharactersInventoriesQuery } from '@/entities/game/model/query/game.query';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { MenuType } from '../GameModal';
import { useGameCharacterEquipItemMutation } from '@/entities/game/model/mutation/game.mutation';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import { toast } from 'sonner';
interface CharacterInventoryProps {
  activeMenu: MenuType;
}
const CharacterInventory = (props: CharacterInventoryProps) => {
  const { activeMenu } = props;
  // const queryClient = useQueryClient();
  const [inventoryPage, setInventoryPage] = useState(0);
  const { data, isLoading } = useGetGameCharactersInventoriesQuery(activeMenu === 'inventory');
  const { mutateAsync } = useGameCharacterEquipItemMutation();

  const handleEquipItemClick = async (pName: string) => {
    try {
      const response = await mutateAsync({ name: pName });
      if (response.data.status === API_CONSTANTS.CODE.OK) {
        console.log(response.data);
        toast.success('장착 성공!', {
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

  const itemsPerPage = 6;

  const { totalPages, currentItems } = useMemo(() => {
    const totalItems = data?.data?.result?.length ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = inventoryPage * itemsPerPage;
    const currentItems = data?.data?.result?.slice(startIndex, startIndex + itemsPerPage);

    return {
      totalPages,
      currentItems,
    };
  }, [data?.data?.result, inventoryPage]);

  return (
    <div className="h-full flex flex-col relative">
      {isLoading ? (
        <div className="animate-spin w-8 h-8 border-2 border-[#00d084] border-t-transparent rounded-full mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#00d084] text-lg font-bold">인벤토리</h3>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setInventoryPage(Math.max(0, inventoryPage - 1))}
                disabled={inventoryPage === 0}
                className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-[#ccc] text-sm">
                {inventoryPage + 1} / {Math.max(1, totalPages)}
              </span>
              <Button
                onClick={() => setInventoryPage(Math.min(totalPages - 1, inventoryPage + 1))}
                disabled={inventoryPage >= totalPages - 1}
                className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="h-full flex flex-col">
              <div className="grid grid-cols-3 gap-2 h-full auto-rows-fr">
                {Array.from({ length: itemsPerPage }).map((_, i) => {
                  const item = currentItems?.[i];
                  return (
                    <div
                      key={i}
                      className="h-full bg-[#0c151c] border border-[#214d35] rounded-[10px] p-2 flex flex-col text-xs gap-1 relative group transition-all duration-200 hover:bg-[#0a0f14] hover:border-[#00d084]"
                    >
                      {item ? (
                        <>
                          <div
                            className="transition-opacity duration-200 group-hover:opacity-30 cursor-pointer"
                            onClick={() => handleEquipItemClick(item.name)}
                          >
                            <div>
                              <div className="text-white font-bold mb-1 truncate text-[14px]">
                                {item.name}
                              </div>
                              <div className="flex mb-1">
                                {[...Array(5)].map((_, starIndex) => (
                                  <Star
                                    key={starIndex}
                                    className={`w-2 h-2 fill-yellow-400 text-yellow-400`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-[#888] mb-1">{item.grade}</div>
                              <div className="text-[#ccc] mb-1">{item.itemCategory}</div>
                              <div className="text-[#ccc] mb-1">{item.description}</div>
                              <div className="flex flex-col gap-1">
                                {item.itemCategory === 'WEAPON' && (
                                  <>
                                    <div className="text-[#888]">ACCURACY: {item.accuracy}</div>
                                    <div className="text-[#888]">ATK: {item.atk}</div>
                                    <div className="text-[#888]">CRIT: {item.crit}</div>
                                    <div className="text-[#888]">SPEED: {item.speed}</div>
                                    <div className="text-[#888]">STUN: {item.stun}</div>
                                  </>
                                )}
                                {item.itemCategory === 'DEFENCE' && (
                                  <>
                                    <div className="text-[#888]">ACCURACY: {item.accuracy}</div>
                                    <div className="text-[#888]">ATK: {item.atk}</div>
                                    <div className="text-[#888]">CRIT: {item.crit}</div>
                                    <div className="text-[#888]">SPEED: {item.speed}</div>
                                    <div className="text-[#888]">STUN: {item.stun}</div>
                                  </>
                                )}
                                {item.itemCategory === 'ACCESSORY' && (
                                  <>
                                    <div className="text-[#888]">ACCURACY: {item.accuracy}</div>
                                    <div className="text-[#888]">CRIT: {item.crit}</div>
                                    <div className="text-[#888]">EVASION: {item.evasion}</div>
                                    <div className="text-[#888]">SPEED: {item.speed}</div>
                                    <div className="text-[#888]">STUN: {item.stun}</div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* 호버 시 장착 버튼 */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              onClick={() => handleEquipItemClick(item.name)}
                              className="bg-[#00d084] hover:bg-[#00b874] text-white font-bold px-4 py-2 rounded-[8px] transition-all duration-200"
                            >
                              장착
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
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterInventory;
