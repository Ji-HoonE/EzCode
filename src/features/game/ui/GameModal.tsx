'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  X,
  Sword,
  Package,
  Zap,
  Users,
  Gift,
  Map,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import CharacterStatus from './tab/CharacterStatus';
import CharacterInventory from './tab/CharacterInventory';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasCharacter: boolean;
}

export type MenuType = 'status' | 'inventory' | 'skills' | 'pvp' | 'gacha' | 'adventure' | null;

export function GameModal({ isOpen, onClose, hasCharacter }: GameModalProps) {
  const [activeMenu, setActiveMenu] = useState<MenuType>('status');

  // 인벤토리 네비게이션
  const [inventoryPage, setInventoryPage] = useState(0);

  // PVP 상태
  const [pvpSubMenu, setPvpSubMenu] = useState<'main' | 'battle' | 'defence'>('main');
  const [battleState, setBattleState] = useState<'searching' | 'found' | 'battle' | 'result'>(
    'searching'
  );
  const [matchTimer, setMatchTimer] = useState(60);
  const [opponent, setOpponent] = useState<any>(null);

  // 뽑기 상태
  const [gachaState, setGachaState] = useState<'shop' | 'category' | 'result'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<
    'weapon' | 'defense' | 'accessory' | null
  >(null);

  // 어드벤처 상태
  const [adventureState, setAdventureState] = useState<'main' | 'choices' | 'result'>('main');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const menuItems = [
    { id: 'status' as MenuType, label: '상태창 할인', icon: Sword },
    { id: 'inventory' as MenuType, label: '인벤토리', icon: Package },
    { id: 'skills' as MenuType, label: '보유 스킬', icon: Zap },
    { id: 'pvp' as MenuType, label: 'PVP 랜덤매칭', icon: Users },
    { id: 'gacha' as MenuType, label: '아이템/스킬뽑기', icon: Gift },
    { id: 'adventure' as MenuType, label: '어드벤처', icon: Map },
  ];

  const renderInventoryPage = () => {
    const itemsPerPage = 12;
    const totalPages = 3;

    const items = [
      {
        name: '강철 검',
        description: '튼튼한 강철로 만든 검',
        stats: '공격력 +25',
        grade: '커먼',
        stars: 2,
      },
      {
        name: '마법 반지',
        description: '마나를 증가시키는 반지',
        stats: 'MP +50',
        grade: '언커먼',
        stars: 3,
      },
      {
        name: '체력 포션',
        description: '체력을 회복하는 물약',
        stats: 'HP +100',
        grade: '커먼',
        stars: 1,
      },
      {
        name: '민첩 부츠',
        description: '이동속도를 높이는 부츠',
        stats: '속도 +15',
        grade: '레어',
        stars: 4,
      },
      {
        name: '방어 갑옷',
        description: '방어력을 높이는 갑옷',
        stats: '방어력 +30',
        grade: '언커먼',
        stars: 3,
      },
      {
        name: '마나 크리스탈',
        description: '마법력을 증폭시키는 크리스탈',
        stats: '마법력 +20',
        grade: '레어',
        stars: 4,
      },
    ];

    const startIndex = inventoryPage * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-4 gap-2 flex-1">
          {Array.from({ length: itemsPerPage }).map((_, i) => {
            const item = currentItems[i];
            return (
              <div
                key={i}
                className="aspect-square bg-[#0c151c] border border-[#214d35] rounded-[10px] p-2 flex flex-col justify-between text-xs"
              >
                {item ? (
                  <>
                    <div>
                      <div className="text-white font-bold mb-1 truncate">{item.name}</div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-2 h-2 ${starIndex < item.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#ccc] mb-1">{item.description}</div>
                      <div className="text-[#00d084] mb-1">{item.stats}</div>
                      <div className="text-[#888]">{item.grade}</div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-[#888]">빈 슬롯</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDetailContent = () => {
    switch (activeMenu) {
      case 'status':
        return <CharacterStatus activeMenu={activeMenu} />;

      case 'inventory':
        return <CharacterInventory activeMenu={activeMenu} />;

      case 'skills':
        return (
          <div className="h-full flex flex-col">
            <h3 className="text-[#00d084] text-lg font-bold mb-4">보유 스킬</h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-[#0c151c] p-3 rounded-[10px] border border-[#214d35]">
                  <div className="flex justify-between items-center">
                    <span className="text-white">스킬 {i + 1}</span>
                    <span className="text-[#888] text-sm">
                      Lv.{Math.floor(Math.random() * 5) + 1}
                    </span>
                  </div>
                  <p className="text-[#ccc] text-xs mt-1">스킬 설명이 여기에 표시됩니다.</p>
                </div>
              ))}
            </div>
          </div>
        );

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

      case 'adventure':
        return (
          <div className="space-y-4">
            <h3 className="text-[#00d084] text-lg font-bold">어드벤처</h3>

            {adventureState === 'main' && (
              <div className="space-y-4">
                <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
                  <h4 className="text-white mb-2">어드벤처 안내</h4>
                  <p className="text-[#ccc] text-sm">
                    신비로운 모험을 떠나보세요. 당신의 선택에 따라 다양한 결과를 얻을 수 있습니다.
                  </p>
                </div>

                <Button
                  onClick={() => setAdventureState('choices')}
                  className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200"
                >
                  어드벤처 시작
                </Button>
              </div>
            )}

            {adventureState === 'choices' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setAdventureState('main')}
                  className="text-[#00d084] hover:text-white bg-transparent hover:bg-[rgba(255,255,255,0.08)] rounded-[10px] p-2 transition-all duration-200"
                >
                  ← 뒤로가기
                </Button>

                <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
                  <h4 className="text-white mb-3">상황</h4>
                  <p className="text-[#ccc] text-sm mb-4">
                    어두운 숲을 걷던 중 갈림길을 발견했습니다. 왼쪽 길에서는 이상한 빛이 나오고,
                    오른쪽 길에서는 물소리가 들립니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setSelectedChoice(1);
                      setAdventureState('result');
                    }}
                    className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 text-left"
                  >
                    <div>
                      <div className="font-bold mb-1">선택지 1: 빛이 나는 왼쪽 길</div>
                      <div className="text-sm text-[#ccc]">신비로운 빛을 따라가 본다</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => {
                      setSelectedChoice(2);
                      setAdventureState('result');
                    }}
                    className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] p-4 transition-all duration-200 text-left"
                  >
                    <div>
                      <div className="font-bold mb-1">선택지 2: 물소리가 나는 오른쪽 길</div>
                      <div className="text-sm text-[#ccc]">물소리를 따라 안전한 곳을 찾는다</div>
                    </div>
                  </Button>
                </div>
              </div>
            )}

            {adventureState === 'result' && selectedChoice && (
              <div className="space-y-4">
                <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#214d35]">
                  <h4 className="text-white mb-3">결과</h4>
                  {selectedChoice === 1 ? (
                    <div>
                      <p className="text-[#ccc] text-sm mb-4">
                        빛을 따라가니 고대 유적을 발견했습니다! 유적 안에서 신비로운 보물을
                        획득했습니다.
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
                  onClick={() => {
                    setAdventureState('main');
                    setSelectedChoice(null);
                  }}
                  className="w-full bg-[#214d35] hover:bg-[#276e48] text-white rounded-[10px] py-2 transition-all duration-200"
                >
                  다시 모험하기
                </Button>
              </div>
            )}
          </div>
        );

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
        className="max-w-[50vw] w-full w-full h-[600px]  bg-[#0c151c] border border-[#214d35] p-0 overflow-hidden"
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
                      <img
                        src="/images/character-sprite.png"
                        alt="캐릭터 스프라이트"
                        className="w-16 h-16 pixelated"
                        style={{ imageRendering: 'pixelated' }}
                      />
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
