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
  const { data, isPending } = useDiscussionsQuery(problemId);
  const discussions = data?.result.content;

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-[10px]">
      <DiscussionForm problemId={problemId} mode="create" />
      <div>
        {!discussions ? (
          <div>토론 목록을 불러오는데 실패했습니다.</div>
        ) : (
          <>
            {discussions.length < 1 ? (
              <div>아직 토론이 없습니다.</div>
            ) : (
              discussions.map((content) => {
                return <Discussion discussion={content} key={content.discussionId} />;
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}
