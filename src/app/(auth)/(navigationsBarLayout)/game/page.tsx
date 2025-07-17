import CreateCharacter from './_ui/CreateCharacter';
import CharacterIntro from './_ui/CharacterIntro';
import { gameApi } from '@/api/service/game/game';
export const dynamic = 'force-dynamic';

export default async function GamePage() {
  try {
    /** 유저 캐릭터 보유 여부 api 조회 */
    const response = await gameApi.checkCharacter();
    /** 유저 캐릭터 보유 여부 없으면 캐릭터 생성 페이지로 이동 */
    if (response.data.result.isCharacterExist === false) {
      return <CreateCharacter />;
    }
    /** 유저 캐릭터 보유 여부 있으면 게임 페이지로 이동 */
    return (
      <div className="w-full h-full flex  items-center justify-center gap-30 ">
        <div>
          <CharacterIntro />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}
