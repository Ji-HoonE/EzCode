'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import StatusModal from './tab/StatusModal';
import InventoriesModal from './tab/InventoriesModal';
import SkillModal from './tab/SkillModal';

const CharacterIntro = () => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isInventoriesModalOpen, setIsInventoriesModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
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
      <StatusModal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} />
      <InventoriesModal
        isOpen={isInventoriesModalOpen}
        onClose={() => setIsInventoriesModalOpen(false)}
      />
      <SkillModal isOpen={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)} />
    </div>
  );
};

export default CharacterIntro;
