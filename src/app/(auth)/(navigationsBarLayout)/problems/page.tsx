'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import ProblemTable from './ui/Table';
import { useProblemListQuery } from '@/entities/problems/model/query';
import { Select } from '@/shared/ui/select/Select';
import { Button } from '@/shared/ui/button/Button';

const FilterSelect = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 w-1/3">{children}</div>;
};

const ProblemsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const categoryCodeOptions = [
    { label: 'BFS', value: 'BFS' },
    { label: 'DFS', value: 'DFS' },
    { label: '수학', value: '수학' },
    { label: '조건문', value: '조건문' },
  ];

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
                  <span>{categoryCode}</span>
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
