'use client';
import { useRepliesQuery } from '@/query/discussions/replies/replies.query';
// import Vote from './Vote';
import { ProblemId } from '@/shared';
import { Spinner } from '@/shared/ui/loading-indicators';

interface RepliesProps {
  isOpen?: boolean;
  problemId: ProblemId;
  discussionId: number;
}
export default function Replies({ problemId, discussionId }: RepliesProps) {
  const queryResult = useRepliesQuery(problemId, discussionId);
  const data = queryResult?.data;
  const isPending = queryResult?.isPending;

  if (isPending) {
    return <Spinner />;
  }
  return (
    <div>
      <input placeholder="댓글 다는 임시 인풋" />
      {data?.result.empty ? (
        <p>아직 댓글이 없습니다.</p>
      ) : (
        <>
          {data?.result.content.map((reply) => {
            <div>
              <h3>닉네임: {reply.userInfo.nickname}</h3>

              <p>{reply.content}</p>
              <div className="flex items-center">
                {/* <Vote content={{ problemId: Number(problemId), discussionId }} /> */}
              </div>
            </div>;
          })}
        </>
      )}
    </div>
  );
}
