'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import ProblemTable from './ui/Table';
import { useProblemListQuery } from '@/entities/problems/model/query';
import { Select } from '@/shared/ui/select/Select';
import { Button } from '@/shared/ui/button/Button';

const categoryCodeOptions = [
  { label: '출력', value: 'OUTPUT' },
  { label: '사칙연산', value: 'ARITHMETIC' },
  { label: '배열', value: 'ARRAY' },
  { label: '조건문', value: 'CONDITIONAL' },
  { label: '정렬', value: 'SORTING' },
  { label: '수학', value: 'MATH' },
  { label: '시뮬레이션', value: 'SIMULATION' },
  { label: '자료구조', value: 'DATA_STRUCTURE' },
  { label: '입문자용', value: 'FOR_BEGINNER' },
  { label: '구현', value: 'IMPLEMENTATION' },
  { label: '그리디', value: 'GREEDY' },
  { label: '문자열 처리', value: 'STRING_PROCESSING' },
  { label: '해시맵', value: 'HASH_MAP' },
  { label: '선형 탐색', value: 'LINEAR_SEARCH' },
  { label: '동적 계획법', value: 'DP' },
  { label: '순환 탐지', value: 'CYCLE_DETECTION' },
  { label: '비트 연산', value: 'BIT_OPERATION' },
  { label: '반복 제어', value: 'LOOP_CONTROL' },
  { label: '카운팅', value: 'COUNTING' },
  { label: '너비 우선 탐색', value: 'BFS' },
  { label: '깊이 우선 탐색', value: 'DFS' },
  { label: '비트마스킹', value: 'BITMASK' },
  { label: '해시', value: 'HASH' },
  { label: '맵', value: 'MAP' },
  { label: '반복문', value: 'LOOPS' },
  { label: '분할 정복', value: 'DIVIDE_AND_CONQUER' },
  { label: '문자열', value: 'STRING' },
  { label: '집합론', value: 'SET_THEORY' },
  { label: '누적 합', value: 'PREFIX_SUM' },
  { label: '기하학', value: 'GEOMETRY' },
  { label: '이분 탐색', value: 'BINARY_SEARCH' },
  { label: '투포인터', value: 'TWO_POINTERS' },
  { label: '그래프 이론', value: 'GRAPH_THEORY' },
  { label: '탐색', value: 'SEARCH' },
  { label: '우선순위 큐', value: 'PRIORITY_QUEUE' },
  { label: '백트래킹', value: 'BACKTRACKING' },
  { label: '알고리즘', value: 'ALGORITHM' },
  { label: '트리', value: 'TREE' },
  { label: '상태 압축', value: 'STATE_COMPRESSION' },
  { label: '재귀', value: 'RECURSION' },
  { label: '큐', value: 'QUEUE' },
  { label: '최대 유량', value: 'MAX_FLOW' },
  { label: '최소 컷', value: 'MIN_CUT' },
  { label: '최소 스패닝 트리', value: 'MINIMUM_SPANNING_TREE' },
  { label: '완전 탐색', value: 'BRUTE_FORCE' },
  { label: '조합론', value: 'COMBINATORICS' },
  { label: '세그먼트 트리', value: 'SEGMENT_TREE' },
  { label: 'Deque', value: 'DEQUE' },
  { label: '해밍 거리', value: 'HAMMING_DISTANCE' },
  { label: '2차원 배열', value: 'TWO_DIMENSIONAL_ARRAY' },
  { label: '누적 선택 최적화', value: 'CUMULATIVE_SELECTION_OPTIMIZATION' },
  { label: '좌표', value: 'COORDINATE' },
  { label: '최대공약수(GCD)', value: 'GCD' },
  { label: '수열', value: 'SEQUENCE' },
  { label: '집합 처리', value: 'SET_PROCESSING' },
  { label: '그래프 탐색', value: 'GRAPH_SEARCH' },
  { label: '분리 집합', value: 'DISJOINT_SET' },
  { label: '조합', value: 'COMBINATION' },
];

const FilterSelect = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 w-1/3">{children}</div>;
};

const ProblemsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const difficultyOptions = [
    { label: 'LV1', value: 'LV1' },
    { label: 'LV2', value: 'LV2' },
    { label: 'LV3', value: 'LV3' },
    { label: 'LV4', value: 'LV4' },
    { label: 'LV5', value: 'LV5' },
    { label: 'LV6', value: 'LV6' },
    { label: 'LV7', value: 'LV7' },
  ];
  const [categoryCode, setCategoryCode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useProblemListQuery(
    currentPage,
    10,
    '',
    categoryCode,
    difficulty,
    search
  );

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className="flex flex-col px-10 py-18 w-full gap-4 justify-center items-center">
      <div className="flex flex-col max-w-[1600px] w-full gap-6">
        <section>
          <h1 className="text-3xl font-bold mb-2">문제 리스트</h1>
          <p className="text-gray-400">코딩테스트 문제를 난이도별로 확인하고 도전해보세요</p>
        </section>
        <section className="flex flex-col gap-10">
          <section className="mb-6 p-6 bg-gray-900/50 rounded-[10px] border border-gray-800">
            <div className="flex flex-row gap-4 items-center w-full">
              <FilterSelect>
                <label htmlFor="category" className="text-base">
                  카테고리{' '}
                </label>
                <Select
                  className="w-full"
                  title="카테고리"
                  option={categoryCodeOptions}
                  setValue={(value) => setCategoryCode(value)}
                  value={categoryCode}
                  id="category"
                />
              </FilterSelect>
              <FilterSelect>
                <label htmlFor="difficulty" className="text-base">
                  난이도{' '}
                </label>
                <Select
                  id="difficulty"
                  className="w-full"
                  title="난이도"
                  option={difficultyOptions}
                  setValue={(value) => setDifficulty(value)}
                  value={difficulty}
                />
              </FilterSelect>

              <FilterSelect>
                <label className="text-base">검색</label>
                <div className="flex flex-row  w-full gap-5">
                  <input
                    placeholder="문제 제목 또는 번호 검색"
                    className="text-base border px-2 border-gray-700 rounded h-12  w-full  bg-gray-800"
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSearch(keyword);
                        setCurrentPage(1);
                      }
                    }}
                  />

                  <Button
                    aria-label="검색"
                    onClick={() => {
                      setSearch(keyword);
                      setCurrentPage(1);
                    }}
                    label={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 36 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                      >
                        <path
                          d="M15.7751 0.734863C24.1269 0.734863 30.898 7.50521 30.8982 15.8569L30.8933 16.2476C30.809 19.5745 29.65 22.6344 27.7507 25.0933L35.4509 32.7935L31.9158 36.3286L24.0818 28.4946C21.6975 30.0649 18.8434 30.98 15.7751 30.98L15.3855 30.9751C7.21385 30.7682 0.653076 24.0784 0.653076 15.8569C0.653281 7.50534 7.42355 0.735068 15.7751 0.734863ZM15.7751 5.73486C10.185 5.73507 5.65328 10.2668 5.65308 15.8569C5.65308 21.4473 10.1848 25.9798 15.7751 25.98C21.3656 25.98 25.8982 21.4474 25.8982 15.8569C25.898 10.2666 21.3655 5.73486 15.7751 5.73486Z"
                          fill="white"
                        />
                      </svg>
                    }
                  />
                </div>
              </FilterSelect>
            </div>
          </section>
          {(categoryCode !== '전체' || difficulty !== '전체') && (
            <div
              data-testid="selected-filters"
              aria-label="선택된 필터"
              className="flex flex-row gap-8"
            >
              {categoryCode !== '전체' && categoryCode && (
                <div className="flex flex-row gap-1 items-center">
                  <span>
                    {categoryCodeOptions.find((item) => item.value === categoryCode)?.label}
                  </span>
                  <Image
                    src="/icons/close/closeWithBorder.svg"
                    className="cursor-pointer"
                    alt="close"
                    width={16}
                    height={16}
                    onClick={() => setCategoryCode('')}
                  />
                </div>
              )}
              {difficulty !== '전체' && difficulty && (
                <div className="flex flex-row gap-1 items-center">
                  <span>{difficulty}</span>
                  <Image
                    src="/icons/close/closeWithBorder.svg"
                    className="cursor-pointer"
                    alt="close"
                    width={16}
                    height={16}
                    onClick={() => setDifficulty('')}
                  />
                </div>
              )}
            </div>
          )}
        </section>

        <ProblemTable
          data={data?.content || []}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ProblemsList;
