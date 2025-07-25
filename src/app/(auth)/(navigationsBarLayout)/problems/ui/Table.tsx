'use client';

import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import { SkeletonBox } from '@/shared/ui/loading-indicators';
import { ProblemsContent } from '@/entities/problems/model/types';
import { Button } from '@/shared/ui/button/Button';

const PAGE_LIMIT = 15;

const getLevelColorClass = (levelStr: string): string => {
  const level = parseInt(levelStr.replace(/[^0-9]/g, ''), 10);
  if (level <= 2) return 'text-orange-300 font-semibold';
  if (level <= 4) return 'text-yellow-500 font-semibold';
  if (level <= 6) return 'text-red-500 font-semibold';
  return 'text-red-700 font-semibold';
};

const getLevelBg = (difficulty: string) => {
  switch (difficulty) {
    case '3':
      return 'bg-yellow-400/10 border-yellow-400/20';
    case '4':
      return 'bg-orange-400/10 border-orange-400/20';
    case '5':
      return 'bg-red-400/10 border-red-400/20';
    case '6':
      return 'bg-red-500/10 border-red-500/20';
    default:
      return 'bg-gray-400/10 border-gray-400/20';
  }
};

export default function ProblemTable({
  data,
  isLoading,
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  data: ProblemsContent[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}) {
  const router = useRouter();
  const [pageGroupStart, setPageGroupStart] = useState(1);

  useEffect(() => {
    if (currentPage < pageGroupStart || currentPage >= pageGroupStart + PAGE_LIMIT) {
      setPageGroupStart(Math.floor((currentPage - 1) / PAGE_LIMIT) * PAGE_LIMIT + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const pageNumbers = useMemo(() => {
    const end = Math.min(pageGroupStart + PAGE_LIMIT - 1, totalPages - 1); //-1한 이유는 현재 백에서 주는 totalPages가 +1되서 들어옴 예를들어 23페이지까지 데이터가 있으면 totalPages는 24로 들어옴
    return Array.from({ length: end - pageGroupStart + 1 }, (_, i) => pageGroupStart + i);
  }, [pageGroupStart, totalPages]);

  // const handlePrevGroup = () => {
  //   if (isLoading || pageGroupStart <= 1) return;
  //   setPageGroupStart((prev) => prev - PAGE_LIMIT);
  //   setCurrentPage(pageGroupStart - 1);
  // };

  // const handleNextGroup = () => {
  //   if (isLoading || pageGroupStart + PAGE_LIMIT > totalPages) return;
  //   setPageGroupStart((prev) => prev + PAGE_LIMIT);
  //   setCurrentPage(pageGroupStart + PAGE_LIMIT);
  // };

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full text-white font-sans bg-gray-900/50 rounded-md  border border-gray-800">
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

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-gray-800 hover:bg-white/[0.08] cursor-pointer"
                      onClick={() => router.push(`/problems/${item.id}`)}
                    >
                      <td className="px-6 py-4 text-sm text-center text-gray-300">{item.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-center text-sm font-medium text-white hover:text-[#00d084] transition-colors">
                            {item.title}
                          </div>
                          <div className="text-center text-xs text-gray-400 mt-1">
                            {item.categories}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-[#00d084] font-medium">
                        {item.score}
                      </td>
                      <td className={`px-6 py-4 text-center text-sm font-medium`}>
                        <span
                          className={`inline-block px-2 py-1 min-w-[50px] text-xs rounded-md border text-center ${getLevelBg(item.difficulty)} ${getLevelColorClass(item.difficulty)}`}
                        >
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300 ">
                        {item.correctSubmissions || 0}건
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300 ">
                        {item.totalSubmissions || 0}건
                      </td>
                      {/* <td className="px-6 py-4 text-center">
                      {item.totalSubmissions === 0 || !item.totalSubmissions
                        ? '0%'
                        : `${Math.round((item.correctSubmissions / item.totalSubmissions) * 100 * 10) / 10}%`}
                    </td> */}
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
          className="w-10 h-10"
          onClick={handlePrevPage}
          variant="outline"
          label={
            <Image
              className="cursor-pointer"
              src="/icons/arrow/arrowLeft.svg"
              width={10}
              height={10}
              alt="page-arrow"
            />
          }
        />

        {pageNumbers.map((num) => (
          // <button
          //   type="button"
          //   key={num}
          //   className={`w-10 h-10 rounded-md flex items-center justify-center text-sm transition bg-[#6B6B6B] ${
          //     currentPage === num
          //       ? 'bg-[#214d35] hover:bg-[#276e48] text-white border-[#214d35]'
          //       : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
          //   }`}
          //   onClick={() => !isLoading && setCurrentPage(num)}
          // >
          //   {num}
          // </button>
          <Button
            onClick={() => {
              if (!isLoading) setCurrentPage(num);
            }}
            key={num}
            label={num}
            className={`w-10 h-10 rounded-md flex items-center justify-center text-sm transition bg-[#6B6B6B] ${
              currentPage === num
                ? 'bg-[#214d35] hover:bg-[#276e48] text-white border-[#214d35]'
                : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
            }`}
          />
        ))}

        <Button
          className="w-10 h-10"
          variant="outline"
          onClick={handleNextPage}
          label={
            <Image
              className="cursor-pointer"
              src="/icons/arrow/arrowRight.svg"
              width={10}
              height={10}
              alt="page-arrow"
            />
          }
        />
      </div>
    </div>
  );
}
