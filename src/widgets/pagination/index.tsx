'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
const PAGE_LIMIT = 10;

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isLoading: boolean;
}
export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading,
}: PaginationProps) {
  const [pageGroupStart, setPageGroupStart] = useState<number>(0); // 0-based group start

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

  // currentPage가 page group 범위를 벗어나면 group start 재조정
  useEffect(() => {
    if (currentPage < pageGroupStart || currentPage >= pageGroupStart + PAGE_LIMIT) {
      setPageGroupStart(Math.floor(currentPage / PAGE_LIMIT) * PAGE_LIMIT);
    }
  }, [currentPage, pageGroupStart]);

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
    <div className="flex justify-center items-center gap-2 mt-4 text-gray-400">
      <Button
        onClick={handlePrevPage}
        className="p-1 bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] w-10 h-10"
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
              ? 'bg-primary text-white border-primary'
              : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
          }`}
        >
          {num + 1}
        </Button>
      ))}
      <Button
        onClick={handleNextPage}
        className="p-1 bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] w-10 h-10"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
