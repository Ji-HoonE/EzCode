import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { useNestedRepliesQuery } from '@/query/discussions/replies/replies.query';
import { Spinner } from '@/shared/ui/loading-indicators';
import NestedReply from './NestedReply';
import { useCreateReplyMutation } from '@/query/discussions/replies/replies.mutation';

interface INestedReplies {
  problemId: string;
  discussionId: number;
  parentReplyId: number;
}
export default function NestedReplies({ problemId, discussionId, parentReplyId }: INestedReplies) {
  const [value, setValue] = useState('');
  const { data, isPending } = useNestedRepliesQuery(problemId, discussionId, parentReplyId);
  const { mutateAsync } = useCreateReplyMutation(problemId, discussionId, true, parentReplyId);

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
        <input
          placeholder="댓글 다는 임시 인풋"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <Button
          onClick={() => {
            mutateAsync({ parentReplyId: parentReplyId, content: value });
            setValue('');
          }}
        >
          생성
        </Button>
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
