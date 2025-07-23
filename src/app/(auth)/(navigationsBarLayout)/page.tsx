import { Button } from '@/components/ui/button';
import { getWeeklyRankings } from '@/entities/rankings/actions/getRankings.actions';
import Rankings from '@/entities/rankings/ui/Rankings';
import ChatDialogOpenButton from '@/features/chat/ui/ChatDialogOpenButton';
import { StartButton } from '@/widgets/landingCTA';
import Image from 'next/image';

export default async function HomePage() {
  const weeklyRankings = await getWeeklyRankings();

  return (
    <main className="w-full flex items-center h-full pt-20 flex-col bg-background text-white">
      <ChatDialogOpenButton />
      {/* <button onClick={handleLogout}>로그아웃</button> */}

      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Image src="/icons/code.svg" alt="메인페이지 로고" width={80} height={80} />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">코딩 실력을</span>
                <br />
                <span className="text-secondary">한 단계 업그레이드</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                매일 새로운 문제로 도전하고, 전국 개발자들과 실력을 겨뤄보세요.
                <br />
                체계적인 학습과 실전 경험을 통해 코딩 테스트를 정복하세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <StartButton />

              <Button
                size="lg"
                variant="outline"
                className="border-primary text-secondary hover:bg-background/20 px-8 py-4 rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
              >
                <Image
                  src="/icons/group.svg"
                  alt="메인페이지 랭킹버튼 로고"
                  width={20}
                  height={20}
                />
                랭킹 보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Rankings rankings={weeklyRankings} />
    </main>
  );
}
