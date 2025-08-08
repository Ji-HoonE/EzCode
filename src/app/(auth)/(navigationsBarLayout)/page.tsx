import { PATHS } from '@/constants/paths';
import { getAllTimeRankings, Rankings } from '@/entities/rank';
import LinkedButton from '@/shared/ui/linkedButton';
import Image from 'next/image';

const PAGE_LINK_ATTRIBUTE = {
  start: {
    href: PATHS.PROBLEMS,
    content: '지금 시작하기',
    className:
      'flex gap-2 bg-secondary text-black px-8 py-4 rounded-[20px] transition-all hover:scale-105 h-10 items-center',
    image: { src: '/icons/target.svg', alt: '메인페이지 시작하기 버튼 이미지', w: 20, h: 20 },
  },
  rank: {
    href: PATHS.RANK,
    content: '랭킹 보기',
    className:
      'flex border border-primary text-secondary px-8 py-4 rounded-[20px] h-10 items-center gap-2 hover:scale-105 transition-all',
    image: { src: '/icons/group.svg', alt: '메인페이지 랭킹버튼 로고', w: 20, h: 20 },
  },
};

export default async function HomePage() {
  const allTimeRanking = await getAllTimeRankings();
  return (
    <main className="w-full h-full py-20 bg-background text-white">
      <section className="text-center container mx-auto px-4">
        <div className="mb-8 flex items-center flex-col gap-6">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-semibold">
          <LinkedButton props={PAGE_LINK_ATTRIBUTE.start} />
          <LinkedButton props={PAGE_LINK_ATTRIBUTE.rank} />
        </div>
      </section>
      <Rankings rankings={allTimeRanking} />
    </main>
  );
}
