'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Sword, Package, Zap, Users, Gift, Map, Shield, User } from 'lucide-react';
import CharacterStatus from './tab/CharacterStatus';
import CharacterInventory from './tab/CharacterInventory';
import ItemSkillGamble from './tab/ItemSkillGamble';
import Adventure from './tab/Adventure';
import CharacterSkill from './tab/CharacterSkill';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasCharacter: boolean;
}

export type MenuType = 'status' | 'inventory' | 'skills' | 'pvp' | 'gacha' | 'adventure' | null;

export function GameModal({ isOpen, onClose, hasCharacter }: GameModalProps) {
  const [activeMenu, setActiveMenu] = useState<MenuType>('status');

  // PVP 상태
  const [pvpSubMenu, setPvpSubMenu] = useState<'main' | 'battle' | 'defence'>('main');
  const [battleState, setBattleState] = useState<'searching' | 'found' | 'battle' | 'result'>(
    'searching'
  );
  const [matchTimer, setMatchTimer] = useState(60);
  const [opponent, setOpponent] = useState<any>(null);

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
        return (
          <div className="space-y-4">
            <h3 className="text-[#00d084] text-lg font-bold">PVP 랜덤매칭</h3>

            {pvpSubMenu === 'main' && (
              <div className="space-y-3">
                <Button
                  onClick={() => setPvpSubMenu('battle')}
                  className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Sword className="w-5 h-5 mr-3" />
                    <span>매칭 시작</span>
                  </div>
                  <span className="text-[#00d084]">→</span>
                </Button>

                <Button
                  onClick={() => setPvpSubMenu('defence')}
                  className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-3" />
                    <span>방어 로그</span>
                  </div>
                  <span className="text-[#00d084]">→</span>
                </Button>

                <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35] mt-4">
                  <h4 className="text-white mb-2">내 전투 정보</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#ccc]">승리</span>
                      <span className="text-[#00d084]">23승</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#ccc]">패배</span>
                      <span className="text-red-400">7패</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#ccc]">승률</span>
                      <span className="text-white">76.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PVP 배틀 및 방어 로그 코드는 이전과 동일 */}
            {pvpSubMenu === 'battle' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setPvpSubMenu('main')}
                  className="text-[#00d084] hover:text-white bg-transparent hover:bg-[rgba(255,255,255,0.08)] rounded-[10px] p-2 transition-all duration-200"
                >
                  ← 뒤로가기
                </Button>

                {battleState === 'searching' && (
                  <div className="text-center space-y-4">
                    <div className="animate-spin w-8 h-8 border-2 border-[#00d084] border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-[#ccc]">비슷한 능력치의 상대를 찾는 중...</p>
                    <Button
                      onClick={() => {
                        setBattleState('found');
                        setOpponent({
                          name: '전사123',
                          level: 24,
                          power: 152,
                          defense: 91,
                          hp: 920,
                        });
                        setMatchTimer(60);
                        const timer = setInterval(() => {
                          setMatchTimer((prev) => {
                            if (prev <= 1) {
                              clearInterval(timer);
                              setBattleState('searching');
                              return 60;
                            }
                            return prev - 1;
                          });
                        }, 1000);
                      }}
                      className="bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] px-6 py-2 transition-all duration-200"
                    >
                      매칭 시작
                    </Button>
                  </div>
                )}

                {battleState === 'found' && opponent && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00d084] mb-2">{matchTimer}초</div>
                      <p className="text-[#ccc] mb-4">상대를 찾았습니다!</p>
                    </div>

                    <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
                      <h4 className="text-white mb-3 text-center">상대 정보</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#ccc]">닉네임</span>
                          <span className="text-[#00d084]">{opponent.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#ccc]">레벨</span>
                          <span className="text-white">{opponent.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#ccc]">공격력</span>
                          <span className="text-white">{opponent.power}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#ccc]">방어력</span>
                          <span className="text-white">{opponent.defense}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#ccc]">HP</span>
                          <span className="text-white">{opponent.hp}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setBattleState('battle')}
                        className="flex-1 bg-[#00d084] hover:bg-[#00b070] text-white rounded-[10px] py-3 transition-all duration-200"
                      >
                        수락
                      </Button>
                      <Button
                        onClick={() => {
                          setBattleState('searching');
                          setOpponent(null);
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-[10px] py-3 transition-all duration-200"
                      >
                        취소
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {pvpSubMenu === 'defence' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setPvpSubMenu('main')}
                  className="text-[#00d084] hover:text-white bg-transparent hover:bg-[rgba(255,255,255,0.08)] rounded-[10px] p-2 transition-all duration-200"
                >
                  ← 뒤로가기
                </Button>

                <h4 className="text-white">방어 기록</h4>
                <div className="space-y-3">
                  <div className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-red-400">패배</span>
                      <span className="text-[#888] text-sm">2시간 전</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-[#ccc]">공격자: </span>
                      <span className="text-white">드래곤킬러</span>
                    </div>
                    <div className="text-sm text-[#888]">-50 Gold, -8 Points</div>
                  </div>

                  <div className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#00d084]">승리</span>
                      <span className="text-[#888] text-sm">5시간 전</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-[#ccc]">공격자: </span>
                      <span className="text-white">마법사99</span>
                    </div>
                    <div className="text-sm text-[#888]">방어 성공</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

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
