'use client';
import { Button } from '@/components/ui/button';
import { useCreateReplyMutation } from '@/query/discussions/replies/replies.mutation';
import { useRepliesQuery } from '@/query/discussions/replies/replies.query';
import { ProblemId } from '@/shared';
import { Spinner } from '@/shared/ui/loading-indicators';
import { ChangeEvent, useState } from 'react';
import Reply from './Reply';

interface RepliesProps {
  problemId: ProblemId;
  discussionId: number;
}
export default function Replies({ problemId, discussionId }: RepliesProps) {
  const [value, setValue] = useState('');
  const queryResult = useRepliesQuery(problemId, discussionId);
  const { mutateAsync } = useCreateReplyMutation(problemId, discussionId);

  const repliesData = queryResult?.data?.result;
  const isPending = queryResult?.isPending;

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="pl-8">
      <div>
        <input
          placeholder="댓글 다는 임시 인풋"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <Button
          onClick={() => {
            mutateAsync({ parentReplyId: null, content: value });
            setValue('');
          }}
        >
          생성
        </Button>
      </div>
      {repliesData?.empty ? (
        <p>아직 댓글이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {repliesData?.content.map((reply) => {
            return <Reply key={reply.replyId} reply={reply} problemId={problemId} />;
          })}
        </div>
      )}
    </div>
  );
}
