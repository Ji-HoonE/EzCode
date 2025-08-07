'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sword, Package, Zap, Users, Gift, Map, User } from 'lucide-react';
import CharacterStatus from './tab/CharacterStatus';
import CharacterInventory from './tab/CharacterInventory';
import ItemSkillGamble from './tab/ItemSkillGamble';
import Adventure from './tab/Adventure';
import CharacterSkill from './tab/CharacterSkill';
import PvpMatch from './tab/PvpMatch';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasCharacter: boolean;
}

export type MenuType = 'status' | 'inventory' | 'skills' | 'pvp' | 'gacha' | 'adventure' | null;

export function GameModal({ isOpen, onClose, hasCharacter }: GameModalProps) {
  const [activeMenu, setActiveMenu] = useState<MenuType>('status');

  const menuItems = [
    { id: 'status' as MenuType, label: '상태창 확인', icon: Sword },
    { id: 'inventory' as MenuType, label: '인벤토리', icon: Package },
    { id: 'skills' as MenuType, label: '보유 스킬', icon: Zap },
    { id: 'pvp' as MenuType, label: 'PVP 랜덤매칭', icon: Users },
    { id: 'gacha' as MenuType, label: '아이템/스킬뽑기', icon: Gift },
    { id: 'adventure' as MenuType, label: '어드벤처', icon: Map },
  ];

  const renderDetailContent = () => {
    switch (activeMenu) {
      case 'status':
        return <CharacterStatus activeMenu={activeMenu} />;

      case 'inventory':
        return <CharacterInventory activeMenu={activeMenu} />;

      case 'skills':
        return <CharacterSkill activeMenu={activeMenu} />;

      case 'pvp':
        return <PvpMatch activeMenu={activeMenu} />;

      case 'gacha':
        return <ItemSkillGamble />;

      case 'adventure':
        return <Adventure activeMenu={activeMenu} />;

      default:
        return (
          <div className="flex items-center justify-center h-full text-[#888]">
            메뉴를 선택해주세요
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent
        className="max-w-[60vw] w-full w-full h-[800px]  bg-[#0c151c] border border-[#214d35] p-0 overflow-hidden"
        pointerDownOutside={true}
      >
        <DialogTitle className="sr-only">게임 메뉴</DialogTitle> {/* 추가된 부분 */}
        <div className="flex h-full">
          {/* 좌측 메뉴 패널 */}
          <div className="w-80 bg-[#1a2332] border-r border-[#214d35] flex flex-col">
            {/* 헤더 */}
            <div className="p-4 border-b border-[#214d35] flex justify-between items-center">
              <h2 className="text-white font-bold">게임 메뉴</h2>
            </div>

            {/* 메뉴 버튼들 */}
            <div className="p-4 space-y-2 flex-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full justify-start text-left p-3 rounded-[10px] transition-all duration-200 ${
                      activeMenu === item.id
                        ? 'bg-[#214d35] text-white'
                        : 'bg-transparent text-white hover:bg-[rgba(255,255,255,0.08)] hover:text-[#00d084]'
                    }`}
                    variant="ghost"
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>

            {/* 캐릭터 영역 */}
            <div className="p-4 border-t border-[#214d35]">
              <div className="bg-[#0c151c] rounded-[10px] p-4 text-center flex flex-col items-center">
                {hasCharacter ? (
                  <>
                    <p className="text-[#00d084] font-bold mb-3">사용자 닉네임</p>
                    <div className="w-24 h-24 mx-auto bg-[#1a2332] rounded-[10px] border border-[#214d35] flex items-center justify-center overflow-hidden">
                      <User className="w-12 h-12 text-[#00d084]" />
                    </div>
                  </>
                ) : (
                  <Button
                    onClick={() => {}}
                    className={`bg-[#214d35] hover:bg-[#214d35] text-white rounded-[10px] p-6 transition-all duration-200 flex flex-col items-start`}
                  >
                    캐릭터 생성
                  </Button>
                )}
              </div>
            </div>
          </div>
          {hasCharacter ? (
            <div className="flex-1 p-9">{renderDetailContent()}</div>
          ) : (
            <div className="h-full flex-1">
              <div className="flex-1 space-y-4 h-full flex items-center justify-center">
                게임 캐릭터를 생성해주세요
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
