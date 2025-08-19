'use client';
import { useSession } from 'next-auth/react';
import ChatDialogOpenButton from './ChatDialogOpenButton';
import GameModalButton from '@/features/game/ui/GameButton';
import { useCheckCharacterQuery } from '@/entities/game/model/query/game.query';

export function GlobalFloatingWidget() {
  const { data: session } = useSession();
  const isLogged = session?.accessToken;

  const { data: characterData } = useCheckCharacterQuery(!!isLogged);

  return (
    <div className="fixed top-[calc(100vh-15%)] left-[calc(100vw-5%)] flex flex-col gap-2">
      {isLogged && <ChatDialogOpenButton />}
      {isLogged && (
        <GameModalButton hasCharacter={characterData?.data?.result?.isCharacterExist || false} />
      )}
    </div>
  );
}
