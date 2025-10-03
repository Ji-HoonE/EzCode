'use client';

import ChatDialogOpenButton from './ChatDialogOpenButton';
import GameModalButton from '@/features/game/ui/GameButton';
import { useCheckCharacterQuery } from '@/entities/game/model/query/game.query';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { GoogleFormBtn } from '@/features/google-form/ui/GoogleFormButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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

  const tooltipContent = '오류 사항, 제안 사항을 구글폼에 남겨주세요!';
  return (
    <div className="fixed bottom-[calc(100vh-95%)] left-[calc(100vw-5%)] flex flex-col gap-2">
      {isLogged && <ChatDialogOpenButton />}
      {isLogged && (
        <GameModalButton hasCharacter={characterData?.data?.result?.isCharacterExist || false} />
      )}

      <Tooltip>
        <TooltipTrigger>
          <GoogleFormBtn />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
