import { TRankings } from '../types';
import NoRanking from './NoRankings';
import RankingItem from './RankingItem';

interface RankingsProps {
  rankings: TRankings;
}

export default function HomePageRanking({ rankings }: RankingsProps) {
  if (!rankings) {
    return (
      <div className="rounded-2xl border border-border_primary">랭킹을 불러오는데 실패했어요.</div>
    );
  }

  return (
    <section className="py-16 flex flex-col justify-center">
      <div className="w-full mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-secondary">EZ-CODE 종합 랭킹</span>
            <span className="text-white"> TOP 3</span>
          </h2>
          <p className="text-gray-400">EZ-CODE 에서 가장 활발하게 문제를 해결한 개발자 3인</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 border-gray-700">
            <div className="p-0">
              <div className="divide-y divide-gray-700">
                <ul className="rounded-2xl border border-border_primary">
                  {rankings.length > 0 ? (
                    <>
                      {rankings.map((ranking) => (
                        <RankingItem key={ranking.userId} ranking={ranking} />
                      ))}
                    </>
                  ) : (
                    <NoRanking />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
