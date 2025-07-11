'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import StatusModal from './tab/StatusModal';
import InventoriesModal from './tab/InventoriesModal';
import SkillModal from './tab/SkillModal';
import PvpMatchingModal from './tab/PvpMatchingModal';
import PvpBattleModal from './tab/PvpBattleModal';

const CharacterIntro = () => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isInventoriesModalOpen, setIsInventoriesModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isPvpModalOpen, setIsPvpModalOpen] = useState(false);
  const [isPvpBattleModalOpen, setIsPvpBattleModalOpen] = useState(false);
  const [battleData, setBattleData] = useState<any>(null);
  const handlePvpAccept = (data: any) => {
    setBattleData(data);
    setIsPvpBattleModalOpen(true); // 배틀 모달 열기
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Button variant="outline" onClick={() => setIsStatusModalOpen(true)}>
        상태창 확인
      </Button>
      <Button variant="outline" onClick={() => setIsInventoriesModalOpen(true)}>
        인벤토리창 확인
      </Button>
      <Button variant="outline" onClick={() => setIsSkillModalOpen(true)}>
        스킬창 확인
      </Button>
      <Button variant="outline" onClick={() => setIsPvpModalOpen(true)}>
        PVP 랜덤매칭
      </Button>
      <StatusModal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} />
      <InventoriesModal
        isOpen={isInventoriesModalOpen}
        onClose={() => setIsInventoriesModalOpen(false)}
      />
      <SkillModal isOpen={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)} />
      <PvpMatchingModal
        isOpen={isPvpModalOpen}
        onClose={() => setIsPvpModalOpen(false)}
        onAccept={handlePvpAccept}
      />
      <PvpBattleModal
        isOpen={isPvpBattleModalOpen}
        onClose={() => setIsPvpBattleModalOpen(false)}
        battleData={battleData}
      />
    </div>
  );
};

export default CharacterIntro;
