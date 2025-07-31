'use client';
import { ProblemId } from '@/shared';
import Discussion from './Discussion';
import { Spinner } from '@/shared/ui/loading-indicators';
import DiscussionForm from './DiscussionForm';
import { useDiscussionsQuery } from '@/entities/discussions';
import { Select } from '@/shared/ui/select/Select';
import { useState } from 'react';

interface IDiscussionProps {
  problemId: ProblemId;
}
interface IPageAble {
  page: string;
  size: string;
  sort: string;
}
export default function Discussions({ problemId }: IDiscussionProps) {
  const [pageAble, setPageAble] = useState<IPageAble>({ page: '0', size: '8', sort: '최신순' });
  const { data: discussions, isPending } = useDiscussionsQuery(problemId, pageAble);

  const sortOptions = [
    { label: '최신순', value: '최신순' },
    { label: '추천 많은 순', value: '추천 많은 순' },
  ];

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px]">
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
              setValue={(value) => setPageAble((prev) => ({ ...prev, sort: value }))}
            />
            {discussions.length < 1 ? (
              <p>아직 토론이 없습니다.</p>
            ) : (
              <div className="space-y-4 transition-transform duration-300 transform translate-y-4 w-full">
                {discussions.map((content) => {
                  return <Discussion discussion={content} key={content.discussionId} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
