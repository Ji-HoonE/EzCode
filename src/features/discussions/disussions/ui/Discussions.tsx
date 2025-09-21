'use client';
import { ProblemId } from '@/shared';
import Discussion from './Discussion';
import { BouncingDots, Spinner } from '@/shared/ui/loading-indicators';
import DiscussionForm from './DiscussionForm';
import { Select } from '@/shared/ui/select/Select';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteDiscussionsQuery } from '@/entities/discussions';
import { sortType } from '@/shared/model/query/paramsQueryKey';
import { useDiscussionParams } from '../model/Discussion.sort.context';
import { useSearchParams } from 'next/navigation';

interface IDiscussionProps {
  problemId: ProblemId;
}

export default function Discussions({ problemId }: IDiscussionProps) {
  const searchParams = useSearchParams();
  const discussionId = searchParams.get('discussionId');
  const [targetId, setTargetId] = useState<string | null>(null);
  const { params, setParams } = useDiscussionParams();
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteDiscussionsQuery(problemId);

  const discussions = data?.pages.flatMap((page) => page.content);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const sortOptions = [
    { label: '인기순', value: '인기순' },
    { label: '최신순', value: '최신순' },
    { label: '추천순', value: '추천순' },
  ] as const;
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (discussionId) {
      setTargetId(discussionId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!targetId) return;

    const el = document.getElementById(targetId);

    if (el) {
      // 이미 DOM에 있으면 스크롤
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTargetId(null); // 한 번만 실행
    } else if (hasNextPage && !isFetchingNextPage) {
      // 없으면 다음 페이지 요청
      fetchNextPage();
    }
  }, [targetId, discussions, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[10px] w-full h-full">
      <DiscussionForm problemId={problemId} mode="create" />
      <div className="flex items-center justify-center">
        {!discussions ? (
          <p>토론 목록을 불러오는데 실패했습니다.</p>
        ) : (
          <div className="flex flex-col w-full">
            {/* <Select
              option={sortOptions}
              title="정렬"
              value={params.sort}
              setValue={(value) => {
                const typedValue = value as sortType;
                setParams((prev) => ({ ...prev, sort: typedValue, sortBy: typedValue }));
              }}
            /> */}
            <div className="flex flex-row gap-1">
              {sortOptions.map((item) => {
                return (
                  <span
                    className={`${item.value === params.sort ? `text-secondary` : ``}`}
                    onClick={() => {
                      setParams((prev) => ({ ...prev, sort: item.label, sortBy: item.label }));
                    }}
                  >
                    {item.label}
                  </span>
                );
              })}
            </div>
            {discussions.length < 1 ? (
              <div className="flex justify-center text-[#ccc] mt-3">
                아직 해당문제의 토론글이 없습니다.
              </div>
            ) : (
              <div className="space-y-4 transition-transform duration-300 transform translate-y-4 w-full ">
                {discussions &&
                  discussions.map((content) => {
                    return (
                      <Discussion
                        id={String(content.discussionId)}
                        discussion={content}
                        key={content.discussionId}
                      />
                    );
                  })}
                <div ref={loaderRef} style={{ height: 1 }} />
                {isFetchingNextPage && (
                  <div className="flex justify-center mt-3">
                    <BouncingDots />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
