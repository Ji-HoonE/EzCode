import { Spinner } from '@/shared/ui/loading-indicators';
import ReplyForm from './ReplyForm';
import NestedReply from './NestedReply';
import { useNestedRepliesQuery } from '@/entities/discussions';

interface INestedReplies {
  problemId: string;
  discussionId: number;
  parentReplyId: number;
}
export default function NestedReplies({ problemId, discussionId, parentReplyId }: INestedReplies) {
  const { data, isPending } = useNestedRepliesQuery(problemId, discussionId, parentReplyId);

  const nestedReplies = data?.result.content;

  if (isPending) {
    return <Spinner />;
  }

  if (!nestedReplies) {
    return <div>불러오는데 실패! </div>;
  }

  return (
    <div>
      <div>
        <ReplyForm
          problemId={problemId}
          discussionId={discussionId}
          mode="create"
          initialValue=""
          parentReplyId={parentReplyId}
        />
      </div>
      {nestedReplies?.length < 1 ? (
        <div>아직 댓글 없음</div>
      ) : (
        <>
          {nestedReplies.map((reply) => {
            return <NestedReply key={reply.replyId} nestedReply={reply} problemId={problemId} />;
          })}
        </>
      )}
    </div>
  );
}
