import Image from 'next/image';
import { IRanking } from '../actions/getRankings.actions.types';

interface RankingsProps {
  rankings: IRanking[];
}

export default function Rankings({ rankings }: RankingsProps) {
  if (!rankings || rankings.length < 1) {
    return <div>랭킹을 불러오는데 실패했어요.</div>;
  }
  return (
    <ul>
      <section className="py-16">
        <div className="w-full mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-[#00d084]">이번 주 랭킹</span>{' '}
              <span className="text-white">TOP 10</span>
            </h2>
            <p className="text-gray-400">이번 주 가장 활발하게 문제를 해결한 개발자들</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 border-gray-700">
              <div className="p-0">
                <div className="divide-y divide-gray-700">
                  {rankings.map((ranking) => (
                    <li
                      key={ranking.userId}
                      className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#214d35] text-white font-bold text-sm">
                          {ranking.ranks}
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* {ranking.badge && <span className="text-lg">{ranking.badge}</span>} */}
                          <span className="font-semibold text-white">{ranking.nickname}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image src="/icons/star.svg" alt="star" width={16} height={16} />
                        <span className="font-bold text-[#00d084]">
                          {ranking.score.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-sm">점</span>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ul>
  );
}
