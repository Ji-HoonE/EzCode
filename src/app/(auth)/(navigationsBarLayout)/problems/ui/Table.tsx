'use client';

import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import { SkeletonBox } from '@/shared/ui/loading-indicators';
import { ProblemsContent } from '@/entities/problems/model/types';

const PAGE_LIMIT = 15;

const getLevelColorClass = (levelStr: string): string => {
  const level = parseInt(levelStr.replace(/[^0-9]/g, ''), 10);
  if (level <= 2) return 'text-orange-300 font-semibold';
  if (level <= 4) return 'text-yellow-500 font-semibold';
  if (level <= 6) return 'text-red-500 font-semibold';
  return 'text-red-700 font-semibold';
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
  }, [currentPage]);

  const pageNumbers = useMemo(() => {
    const end = Math.min(pageGroupStart + PAGE_LIMIT - 1, totalPages);
    return Array.from({ length: end - pageGroupStart + 1 }, (_, i) => pageGroupStart + i);
  }, [pageGroupStart, totalPages]);

  const handlePrevGroup = () => {
    if (isLoading || pageGroupStart <= 1) return;
    setPageGroupStart((prev) => prev - PAGE_LIMIT);
    setCurrentPage(pageGroupStart - 1);
  };

  const handleNextGroup = () => {
    if (isLoading || pageGroupStart + PAGE_LIMIT > totalPages) return;
    setPageGroupStart((prev) => prev + PAGE_LIMIT);
    setCurrentPage(pageGroupStart + PAGE_LIMIT);
  };

  return (
    <div className="flex flex-col w-full text-white font-sans bg-black rounded-md p-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-2 text-center">문제번호</th>
            <th className="py-3 px-2 text-center">제목</th>
            <th className="py-3 px-2 text-center">점수</th>
            <th className="py-3 px-2 text-center">난이도</th>
            <th className="py-3 px-2 text-center">정답 제출 수</th>
            <th className="py-3 px-2 text-center">총 제출 횟수</th>
            <th className="py-3 px-2 text-center">정답률</th>
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
            : data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-900 cursor-pointer"
                  onClick={() => router.push(`/problems/${item.id}`)}
                >
                  <td className="text-center py-3 px-2">{item.id}</td>
                  <td className="text-center py-3 px-2">{item.title}</td>
                  <td className="text-center py-3 px-2">{item.score}</td>
                  <td className={`text-center py-3 px-2 ${getLevelColorClass(item.difficulty)}`}>
                    {item.difficulty}
                  </td>
                  <td className="text-center py-3 px-2">{item.correctSubmissions}건</td>
                  <td className="text-center py-3 px-2">{item.totalSubmissions}건</td>
                  <td className="text-center py-3 px-2">
                    {item.totalSubmissions === 0
                      ? '0%'
                      : `${
                          Math.round((item.correctSubmissions / item.totalSubmissions) * 10) / 10
                        }%`}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-2 mt-4 text-gray-400">
        <Image
          className="cursor-pointer"
          src="/icons/arrow/arrowLeft.svg"
          width={8}
          height={8}
          alt="page-arrow"
          onClick={handlePrevGroup}
        />

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-md flex items-center justify-center text-sm hover:bg-blue-600 transition bg-[#6B6B6B] ${
              currentPage === num ? 'bg-[#FFA75F] text-black' : 'text-white'
            }`}
            onClick={() => !isLoading && setCurrentPage(num)}
          >
            {num}
          </button>
        ))}

        <Image
          className="cursor-pointer"
          src="/icons/arrow/arrowRight.svg"
          width={8}
          height={8}
          alt="page-arrow"
          onClick={handleNextGroup}
        />
      </div>
    </div>
  );
}
