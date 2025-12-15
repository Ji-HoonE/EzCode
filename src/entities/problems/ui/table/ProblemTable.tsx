'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProblemsContent } from '@/entities/problems/model/types';
import { useMyDailySolved } from '@/entities/mypage/model/query';
import { CheckCircle } from 'lucide-react';
import Cookies from 'js-cookie';
import { LevelUtil } from '@/shared/util/levelUtil';
import TableHead from '@/entities/problems/ui/table/TableHead';
import TableSkeleton from './TableSkeleton';
import Pagination from '@/widgets/pagination';

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
  const [myProblemsList, setMyProblemsList] = useState<number[]>([]);
  const { data: myProblems } = useMyDailySolved();
  const token = Cookies.get('accessToken');

  useEffect(() => {
    setMyProblemsList([]);
    if (!token) return;
    if (!myProblems) return;

    const solved = Array.from(
      new Set(myProblems.data.result.dailySolvedCounts.flatMap((item) => item.problemIds))
    );
    setMyProblemsList(solved); // 하나의 배열에 담김
  }, [myProblems, token]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full text-white font-sans bg-gray-900/50 rounded-md border border-gray-800">
        <table className="w-full">
          <TableHead />
          <tbody>
            {isLoading || !data ? (
              <TableSkeleton />
            ) : (
              data.map((item) => {
                const successRate =
                  item.totalSubmissions === 0 || item.correctSubmissions === 0
                    ? 0
                    : Math.round((item.correctSubmissions / item.totalSubmissions) * 100 * 10) / 10;
                const isSolved = myProblemsList.includes(item.id);
                const categories =
                  item.categories?.length > 1
                    ? item.categories.join(', ')
                    : item.categories[0] || '';
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-800/50 hover:bg-white/8 transition-colors duration-200 cursor-pointer ${
                      isSolved ? 'bg-primary/10 border-l-4 border-l-secondary' : ''
                    }`}
                    onClick={() => router.push(`/problems/${item.id}`)}
                  >
                    <td className="px-6 py-4 text-sm text-center text-gray-300">{item.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-4 justify-center items-center">
                        {isSolved && <CheckCircle className="w-4 h-4 text-secondary shrink-0" />}
                        <div>
                          <div className="text-center text-sm font-medium text-white hover:text-secondary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-center text-xs text-gray-400 mt-1">{categories}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-secondary font-medium">
                      {item.score}
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-medium`}>
                      <span
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 hover:scale-105 ${LevelUtil.getLevelBg(
                          item.difficulty
                        )} ${LevelUtil.getLevelColorClass(item.difficulty)}`}
                      >
                        {LevelUtil.getLevelText(item.difficulty)}
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
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        isLoading={isLoading}
      />
    </div>
  );
}
