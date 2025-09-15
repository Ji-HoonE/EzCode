'use client';

import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SkeletonBox } from '@/shared/ui/loading-indicators';
import { ProblemsContent } from '@/entities/problems/model/types';
import { useSubmissionList } from '@/entities/mypage/model/query';
import { useSession } from 'next-auth/react';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PAGE_LIMIT = 15;

const getLevelColorClass = (levelStr: string): string => {
  if (!levelStr) return '';
  const level = parseInt(levelStr.replace(/[^0-9]/g, ''), 10);
  if (level <= 2) return 'text-blue-400 font-medium';
  if (level <= 4) return 'text-yellow-400 font-medium';
  if (level <= 6) return 'text-orange-400 font-medium';
  return 'text-red-400 font-medium';
};

const getLevelBg = (difficulty: string) => {
  const level = parseInt(difficulty.replace(/[^0-9]/g, ''), 10);
  if (level <= 2) return 'bg-blue-500/20 border-blue-500/30';
  if (level <= 4) return 'bg-yellow-500/20 border-yellow-500/30';
  if (level <= 6) return 'bg-orange-500/20 border-orange-500/30';
  return 'bg-red-500/20 border-red-500/30';
};

const getLevelText = (difficulty: string) => {
  const level = parseInt(difficulty.replace(/[^0-9]/g, ''), 10);
  const labels = {
    1: '입문',
    2: '초급',
    3: '중급',
    4: '중상급',
    5: '고급',
    6: '전문가',
    7: '마스터',
  };
  return `${labels[level as keyof typeof labels] || '알 수 없음'} (${level}단계)`;
};

export default function ProblemTable({
  data,
  isLoading,
  currentPage, // 0-based
  setCurrentPage,
  totalPages, // API에서 오는 "페이지 수" (count)
}: {
  data: ProblemsContent[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}) {
  const router = useRouter();
  const [pageGroupStart, setPageGroupStart] = useState<number>(0); // 0-based group start
  const [myProblemsList, setMyProblemsList] = useState<number[]>([]);
  const { data: myProblems } = useSubmissionList();
  // const { data: session } = useSession();
  const token = Cookies.get('accessToken')



  useEffect(() => {
    
    setMyProblemsList([]);
    // if (!session) return;
    if(!token) return ;
    console.log('123')
    if (!myProblems) return;
    myProblems.result.forEach((item) => setMyProblemsList((prev) => [...prev, item.problemId]));
  }, [myProblems, token]);

  // currentPage가 page group 범위를 벗어나면 group start 재조정
  useEffect(() => {
    if (currentPage < pageGroupStart || currentPage >= pageGroupStart + PAGE_LIMIT) {
      setPageGroupStart(Math.floor(currentPage / PAGE_LIMIT) * PAGE_LIMIT);
    }
  }, [currentPage, pageGroupStart]);

  // totalPages는 "페이지 수" (count)라고 가정 -> lastIndex = totalPages - 1
  const lastIndex = Math.max(totalPages - 1, 0);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 0) return [];
    const end = Math.min(pageGroupStart + PAGE_LIMIT - 1, lastIndex);
    return Array.from({ length: end - pageGroupStart + 1 }, (_, i) => pageGroupStart + i);
  }, [pageGroupStart, totalPages, lastIndex]);

  // 오른쪽 화살표: 한 그룹 앞으로 (혹은 마지막 인덱스)
  const handleNextPage = () => {
    if (pageGroupStart + PAGE_LIMIT <= lastIndex) {
      setCurrentPage(pageGroupStart + PAGE_LIMIT); // 다음 그룹 시작점
    } else {
      setCurrentPage(lastIndex); // 마지막 그룹에서 넘어가면 마지막 페이지로
    }
  };

  // 왼쪽 화살표: 한 그룹 뒤로 (혹은 0)
  const handlePrevPage = () => {
    const prevGroupEnd = pageGroupStart - 1;
    if (prevGroupEnd >= 0) {
      setCurrentPage(prevGroupEnd); // 이전 그룹의 마지막 페이지
    } else {
      setCurrentPage(0); // 이미 첫 그룹이면 첫 페이지
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full text-white font-sans bg-gray-900/50 rounded-md border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-800/50">
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">번호</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">제목</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">점수</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">난이도</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">정답</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">제출</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">정답률</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !data
              ? Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    {Array.from({ length: 7 }).map((__, colIdx) => (
                      <td key={colIdx} className="text-center py-3 px-2">
                        <SkeletonBox width={60} height={16} />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((item) => {
                  const successRate =
                    item.totalSubmissions === 0 || item.correctSubmissions === 0
                      ? 0
                      : Math.round((item.correctSubmissions / item.totalSubmissions) * 100 * 10) /
                        10;
                  const isSolved = myProblemsList.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-800/50 hover:bg-white/[0.08] transition-colors duration-200 cursor-pointer ${
                        isSolved ? 'bg-[#214d35]/10 border-l-4 border-l-[#00d084]' : ''
                      }`}
                      onClick={() => router.push(`/problems/${item.id}`)}
                    >
                      <td className="px-6 py-4 text-sm text-center text-gray-300">{item.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-row gap-4 justify-center items-center">
                          {isSolved && (
                            <CheckCircle className="w-4 h-4 text-[#00d084] flex-shrink-0" />
                          )}
                          <div>
                            <div className="text-center text-sm font-medium text-white hover:text-[#00d084] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-center text-xs text-gray-400 mt-1">
                              {item.categories.join(', ')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-[#00d084] font-medium">
                        {item.score}
                      </td>
                      <td className={`px-6 py-4 text-center text-sm font-medium`}>
                        <span
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 hover:scale-105 ${getLevelBg(
                            item.difficulty
                          )} ${getLevelColorClass(item.difficulty)}`}
                        >
                          {getLevelText(item.difficulty)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300 ">
                        {item.correctSubmissions || 0}건
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300 ">
                        {item.totalSubmissions || 0}건
                      </td>
                      <td
                        className={`text-center text-sm font-medium ${successRate >= 70 ? 'text-green-400' : successRate >= 40 ? 'text-yellow-400' : 'text-red-400'}`}
                      >
                        {successRate}%
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-2 mt-4 text-gray-400">
        <Button
          onClick={handlePrevPage}
          className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] w-10 h-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {pageNumbers.map((num) => (
          <Button
            key={num}
            onClick={() => {
              if (!isLoading) setCurrentPage(num);
            }}
            className={`w-10 h-10 rounded-md flex items-center justify-center text-sm transition ${
              currentPage === num
                ? 'bg-[#214d35] hover:bg-[#276e48] text-white border-[#214d35]'
                : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
            }`}
          >
            {num + 1}
          </Button>
        ))}
        <Button
          onClick={handleNextPage}
          className="p-1 bg-[#214d35] hover:bg-[#276e48] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] w-10 h-10"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
