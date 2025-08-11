import GameModalButton from '@/features/game/ui/GameButton';
import ChatDialogOpenButton from './ChatDialogOpenButton';
import { gameApi } from '@/api/service/game/game';
import { getServerSession } from 'next-auth';

export async function GlobalFloatingWidget() {
  const response = await gameApi.checkCharacter();
  const session = await getServerSession();
  const isLogged = !session?.accessToken;

  return (
    <div className="fixed top-[calc(100vh-15%)] left-[calc(100vw-10%)] flex flex-col gap-2">
      {isLogged && <ChatDialogOpenButton />}
      <GameModalButton hasCharacter={response.data.result.isCharacterExist} />
    </div>
  );
}
