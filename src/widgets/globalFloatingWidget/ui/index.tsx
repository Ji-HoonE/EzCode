'use client';

import ChatDialogOpenButton from './ChatDialogOpenButton';
import GameModalButton from '@/features/game/ui/GameButton';
import { useCheckCharacterQuery } from '@/entities/game/model/query/game.query';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
export function GlobalFloatingWidget() {
  const problemId = usePathname().split('/')[2];
  const [isLogged, setIsLogged] = useState(false);
  const { data: characterData } = useCheckCharacterQuery(!!isLogged);

  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (accessToken) {
      setIsLogged(true);
    }
  }, [accessToken]);

  if (problemId) return null;

  return (
    <div className="fixed top-[calc(100vh-15%)] left-[calc(100vw-5%)] flex flex-col gap-2">
      {isLogged && <ChatDialogOpenButton />}
      {isLogged && (
        <GameModalButton hasCharacter={characterData?.data?.result?.isCharacterExist || false} />
      )}
    </div>
  );
}
