'use client';
import { ProblemId } from '@/shared';
import Discussion from './Discussion';
import { Spinner } from '@/shared/ui/loading-indicators';
import DiscussionForm from './DiscussionForm';
import { useDiscussionsQuery } from '@/entities/discussions';

interface IDiscussionProps {
  problemId: ProblemId;
}

export default function Discussions({ problemId }: IDiscussionProps) {
  const { data: discussions, isPending } = useDiscussionsQuery(problemId);

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
          <>
            {discussions.length < 1 ? (
              <p>아직 토론이 없습니다.</p>
            ) : (
              <div className="space-y-4 transition-transform duration-300 transform translate-y-4 w-full">
                {discussions.map((content) => {
                  return <Discussion discussion={content} key={content.discussionId} />;
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
