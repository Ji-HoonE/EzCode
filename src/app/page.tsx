import RankProfile from '@/shared/rank/ui/RankProfile';
import RecommendedTest from '@/shared/Test/ui/RecommendedTest';

export default function RootPage() {
  return (
    <div className="text-white">
      <section>
        <h1>EZ-Code</h1>
        <button>여정 참여하기</button>
      </section>
      <div className="flex">
        <section className="bg-gray-600  rounded-2xl border-none">
          <h2>오늘의 문제 추천</h2>
          <RecommendedTest />
        </section>
        <section className="bg-gray-600  rounded-2xl border-none">
          <h2>이번주의 랭킹</h2>
          <RankProfile />
        </section>
      </div>
    </div>
  );
}
