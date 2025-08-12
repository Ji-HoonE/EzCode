'use client';
import { ProblemId } from '@/shared';
import Discussion from './Discussion';
import { BouncingDots, Spinner } from '@/shared/ui/loading-indicators';
import DiscussionForm from './DiscussionForm';
import { Select } from '@/shared/ui/select/Select';
import { useEffect, useRef, useState } from 'react';
import { sortType } from '@/entities/discussions/discussions/model/query/discussion.query.type';
import { useInfiniteDiscussionsQuery } from '@/entities/discussions';

interface IDiscussionProps {
  problemId: ProblemId;
}

interface IPageAble {
  page: string;
  size: string;
  sort: sortType;
}
export default function Discussions({ problemId }: IDiscussionProps) {
  const [pageAble, setPageAble] = useState<IPageAble>({ page: '0', size: '8', sort: '인기순' });

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteDiscussionsQuery(problemId, pageAble);

  const discussions = data?.pages.flatMap((page) => page.content);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const sortOptions = [
    { label: '인기순', value: '인기순' },
    { label: '최신순', value: '최신순' },
    { label: '추천순', value: '추천순' },
  ];

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
            <Select
              option={sortOptions}
              title="정렬"
              value={pageAble.sort}
              setValue={(value) => {
                const typedValue = value as sortType;
                setPageAble((prev) => ({ ...prev, sort: typedValue }));
              }}
            />
            {discussions.length < 1 ? (
              <div className="flex justify-center text-[#ccc] mt-3">
                아직 해당문제의 토론글이 없습니다.
              </div>
            ) : (
              <div className="space-y-4 transition-transform duration-300 transform translate-y-4 w-full ">
                {discussions &&
                  discussions.map((content) => {
                    return <Discussion discussion={content} key={content.discussionId} />;
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
