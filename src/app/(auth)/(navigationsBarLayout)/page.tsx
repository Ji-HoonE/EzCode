import { getWeeklyRankings } from '@/entities/rankings/actions/getRankings.actions';
import Rankings from '@/entities/rankings/ui/Rankings';
import ChatDialogOpenButton from '@/features/chat/ui/ChatDialogOpenButton';
import { StartButton } from '@/widgets/landingCTA';
import Image from 'next/image';

export default async function HomePage() {
  const weeklyRankings = await getWeeklyRankings();

  return (
    <main className="w-full bg-gradient flex items-center h-full pt-20 flex-col">
      <section>
        <div className="flex items-center">
          <Image src="/logo/EZMainLogo.svg" alt="EZ-MainLogo" width={603} height={603} priority />
          <div className="flex flex-col">
            <h4>EzCode [ez:code] 코딩을 쉽게, 성장은 빠르게</h4>
            <p className="flex flex-col text-right">
              코드가 쉬워지는 순간,
              <Image src="/logo/EzCodeLogo.svg" alt="ezCodeLogo.svg" width={200} height={56} />와
              함께
            </p>
            <StartButton />
            <ChatDialogOpenButton />
            {/* <button onClick={handleLogout}>로그아웃</button> */}
          </div>
        </div>
      </section>

      <Rankings rankings={weeklyRankings} />
    </main>
  );
}
