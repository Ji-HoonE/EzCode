'use client';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { GameModal } from './GameModal';

const GameModalButton = ({ hasCharacter }: { hasCharacter: boolean }) => {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsGameModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#214d35] hover:bg-[#276e48] text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Gamepad2 className="w-6 h-6" />
      </Button>
      <GameModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        hasCharacter={hasCharacter}
      />
    </>
  );
};

export default GameModalButton;
