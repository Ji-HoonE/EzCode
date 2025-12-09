'use client';

import { CompositionEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAutoCompleteKeywordQuery, useProblemListQuery } from '@/entities/problems/model/query';
import { Select } from '@/shared/ui/select/Select';
import { Button } from '@/shared/ui/button/Button';
import { LevelUtil } from '@/shared/util/levelUtil';
import ProblemTable from '@/entities/problems/ui/table/ProblemTable';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '@/entities/problems/model/filter-options';

const ProblemsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryCode, setCategoryCode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState('');
  const [autoCompleteKeyword, setAutoCompleteKeyword] = useState('');

  const { data, isLoading } = useProblemListQuery(
    currentPage,
    10,
    '',
    categoryCode,
    difficulty,
    search
  );

  const { data: autoComplete } = useAutoCompleteKeywordQuery(autoCompleteKeyword);
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    setCurrentPage(0);
  }, [categoryCode, difficulty]);

  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.length >= 2 && value.length <= 25) {
      setAutoCompleteKeyword(value);
    }
  };

  const handleChangeKeyword = (value: string) => {
    if (!value) {
      setAutoCompleteKeyword('');
    }
    setKeyword(value);
  };

  return (
    <div className="flex flex-col px-10 py-18 w-full gap-4 justify-center items-center">
      <div className="flex flex-col max-w-[1600px] w-full gap-6">
        <section>
          <h1 className="text-3xl font-bold mb-2 text-secondary">문제 리스트</h1>
          <p className="text-gray-400">코딩테스트 문제를 난이도별로 확인하고 도전해보세요</p>
        </section>

        {/* 필터영역 */}
        <section className="flex flex-col gap-10">
          <section className="mb-6 p-6 bg-gray-900/50 rounded-[10px] border border-gray-800">
            <div className="flex flex-row gap-4 items-center w-full">
              <div className="flex flex-col gap-1 w-1/3 max-w-[240px]">
                <label htmlFor="category" className="text-base text-secondary">
                  카테고리
                </label>
                <Select
                  id="category"
                  className="w-full"
                  title="카테고리"
                  option={CATEGORY_OPTIONS}
                  setValue={(value) => setCategoryCode(value)}
                  value={categoryCode}
                />
              </div>

              <div className="flex flex-col gap-1 w-1/3 max-w-[200px]">
                <label htmlFor="difficulty" className="text-base text-secondary">
                  난이도
                </label>
                <Select
                  id="difficulty"
                  className="w-full "
                  title="난이도"
                  option={DIFFICULTY_OPTIONS}
                  setValue={(value) => setDifficulty(value)}
                  value={difficulty}
                />
              </div>

              <div className="flex flex-col gap-1 w-1/3">
                <label className="text-base text-secondary">검색</label>
                <div className="flex flex-row w-full gap-5">
                  <div className="relative flex-grow">
                    <input
                      value={keyword}
                      placeholder="2~25글자 사이로 검색해주세요"
                      className="text-base border px-2 border-gray-700 rounded h-12 w-full bg-gray-800"
                      onChange={(e) => handleChangeKeyword(e.target.value)}
                      onCompositionEnd={handleCompositionEnd}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setSearch(keyword);
                          setCurrentPage(0); // 검색하면 0페이지(첫페이지)로
                        }
                      }}
                    />
                    {autoComplete && autoComplete.length > 0 && (
                      <div className="absolute top-14 border px-2 border-gray-700 rounded bg-gray-800 w-full">
                        {autoComplete.map((item) => (
                          <p
                            key={item}
                            className="py-1 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              setKeyword(item);
                              setSearch(item);
                              setAutoCompleteKeyword('');
                              setCurrentPage(0); // 검색하면 0페이지로
                            }}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    aria-label="검색"
                    onClick={() => {
                      setSearch(keyword);
                      setCurrentPage(0); // 검색하면 0페이지로
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
              </div>
            </div>
          </section>

          {(categoryCode !== '전체' || difficulty !== '전체') && (
            <div
              data-testid="selected-filters"
              aria-label="선택된 필터"
              className="flex flex-row gap-4"
            >
              {categoryCode !== '전체' && categoryCode && (
                <div className="flex flex-row gap-2 items-center bg-[#00d084]/20 border border-[#00d084]/30 text-[#00d084] px-3 py-1.5 rounded-full text-sm font-medium">
                  <span>{CATEGORY_OPTIONS.find((item) => item.value === categoryCode)?.label}</span>
                  <Image
                    src="/icons/close/closeWithBorder.svg"
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                    alt="close"
                    width={14}
                    height={14}
                    onClick={() => setCategoryCode('')}
                  />
                </div>
              )}
              {difficulty !== '전체' && difficulty && (
                <div
                  className={`flex flex-row gap-2 items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${LevelUtil.getLevelBg(difficulty)} ${LevelUtil.getLevelColorClass(difficulty)}`}
                >
                  <span>{DIFFICULTY_OPTIONS.find((item) => item.value === difficulty)?.label}</span>
                  <Image
                    src="/icons/close/closeWithBorder.svg"
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                    alt="close"
                    width={14}
                    height={14}
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
          setCurrentPage={(p) => setCurrentPage(p)}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ProblemsList;
