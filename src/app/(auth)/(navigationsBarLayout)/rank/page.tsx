'use client';

import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

import {
  useGetRankAlltime,
  useGetRankAroundMe,
  useGetRankLastWeek,
  useGetRankThisWeek,
} from '@/entities/rank/query';
import { Button } from '@/shared/ui/button/Button';

import { TAroundRanking } from '@/entities/rank/types';
import { getRankIcon } from '@/entities/rank/utils/getRankIcon';
// 이번주 랭킹 데이터

// 역대 랭킹 데이터

// const getTierColor = (tier: string) => {
//   switch (tier) {
//     case '다이아몬드':
//       return 'text-cyan-400';
//     case '플래티넘':
//       return 'text-emerald-400';
//     case '골드':
//       return 'text-yellow-400';
//     case '실버':
//       return 'text-gray-300';
//     default:
//       return 'text-[#ccc]';
//   }
// };

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'last-week' | 'all-time'>('weekly');
  const [myRanking, setMyRanking] = useState<TAroundRanking>(Object);
  const { data: allTimeRanking } = useGetRankAlltime();
  const { data: lastWeekRanking } = useGetRankLastWeek();
  const { data: thisWeekRanking } = useGetRankThisWeek();
  const { data: aroundMeRanking } = useGetRankAroundMe(activeTab || 'weekly');

  useEffect(() => {
    if (!aroundMeRanking) return;
    const found = aroundMeRanking?.find((item) => item.isMe);
    if (found) {
      setMyRanking(found);
    }
  }, [aroundMeRanking]);

  // 현재 활성 탭에 따른 데이터 선택
  const getCurrentRankingData = () => {
    switch (activeTab) {
      case 'weekly':
        return thisWeekRanking?.slice(0, 10);
      case 'last-week':
        return lastWeekRanking?.slice(0, 10);
      case 'all-time':
        return allTimeRanking?.slice(0, 10);
      default:
        return thisWeekRanking?.slice(0, 10);
    }
  };

  // 탭 제목 가져오기
  const getTabTitle = () => {
    switch (activeTab) {
      case 'weekly':
        return '이번주 랭킹';
      case 'last-week':
        return '지난주 랭킹';
      case 'all-time':
        return '역대 랭킹';
      default:
        return '이번주 랭킹';
    }
  };

  return (
    <div className="min-h-screen bg-[#0c151c] text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-10 h-10 text-[#00d084]" />
            <h1 className="text-4xl font-bold text-white">EZ-CODE 랭킹</h1>
          </div>
          <p className="text-[#ccc] text-lg">최고의 코더들과 경쟁하고 실력을 향상시키세요</p>
        </div>

        {/* Ranking Tabs */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-[#1a2332] p-1 rounded-xl border border-gray-800">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'weekly'
                      ? 'bg-[#214d35] text-white shadow-lg'
                      : 'text-[#ccc] hover:text-white hover:bg-white/8'
                  }`}
                >
                  이번주
                </button>
                <button
                  onClick={() => setActiveTab('last-week')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'last-week'
                      ? 'bg-[#214d35] text-white shadow-lg'
                      : 'text-[#ccc] hover:text-white hover:bg-white/8'
                  }`}
                >
                  지난주
                </button>
                <button
                  onClick={() => setActiveTab('all-time')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'all-time'
                      ? 'bg-[#214d35] text-white shadow-lg'
                      : 'text-[#ccc] hover:text-white hover:bg-white/8'
                  }`}
                >
                  역대
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-2">
          <span className="text-sm font-medium">랭킹 1시간마다 갱신 됩니다.</span>
        </div>
        {/* Ranking Table */}
        <div className="bg-[#1a2332] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="px-6 py-4 bg-[#214d35] border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-[#00d084]" />
              <span>{getTabTitle()} TOP 10</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f1a24] border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#ccc] uppercase tracking-wider">
                    순위
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#ccc] uppercase tracking-wider">
                    사용자명
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#ccc] uppercase tracking-wider">
                    점수
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">
                {getCurrentRankingData()?.map((user, index) => {
                  const isMe = user.nickname === myRanking?.nickname;

                  return (
                    <tr
                      key={user.ranks}
                      className={`hover:bg-white/5 transition-all duration-200 ${
                        index < 3 ? 'bg-gradient-to-r from-[#214d35]/20 to-transparent' : ''
                      } ${isMe ? 'bg-[#264d35]/50' : ''}`} // 👈 내가 있으면 배경 강조
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(user.ranks)}
                          {isMe && (
                            <span className="text-xs text-[#00d084] font-semibold">(나)</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#214d35] rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user.nickname.charAt(0)}
                            </span>
                          </div>
                          <span className="text-white font-medium">
                            {user.nickname}{' '}
                            {isMe && (
                              <span className="text-sm text-[#00d084] font-semibold">(나)</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-[#00d084] font-bold text-lg">
                          {user.score.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {myRanking.ranks > 5 && (
                  <tr
                    className={`hover:bg-white/5 transition-all duration-200 bg-gradient-to-r from-[#214d35]/20 to-transparent`} // 👈 내가 있으면 배경 강조
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(myRanking.ranks)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3 ">
                        <div className="w-10 h-10 bg-[#214d35] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {myRanking.nickname.charAt(0)}
                          </span>
                        </div>
                        <span className="text-white font-medium">{myRanking.nickname}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#00d084] font-bold text-lg">{myRanking.score}</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#214d35] to-[#00d084] p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              {activeTab === 'all-time' ? '역대 최고 랭커에 도전하세요!' : '랭킹에 도전하세요!'}
            </h3>
            <p className="text-white/90 mb-6">
              {activeTab === 'all-time'
                ? '꾸준한 노력으로 역대 최고 기록을 세워보세요'
                : '더 많은 문제를 풀고 상위 랭커가 되어보세요'}
            </p>
            <Button
              href="/problems"
              label="문제 풀러 가기"
              className="bg-white text-[#214d35] hover:bg-gray-100 px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            ></Button>
          </div>
        </div>
      </main>
    </div>
  );
}
