import { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { ProblemId } from '@/shared';
import useReply from '../lib/useReply';

interface ReplyFormProps {
  problemId: ProblemId;
  discussionId: number;
  mode: 'create' | 'edit';
  initialValue: string;
  parentReplyId: number | null;
  onClick?: () => void;
}

export default function ReplyForm({
  problemId,
  discussionId,
  mode,
  initialValue,
  parentReplyId,
  onClick,
}: ReplyFormProps) {
  const { value, handleChangeValue, submitReply } = useReply(
    problemId,
    discussionId,
    initialValue,
    parentReplyId
  );

  return (
    <div className="flex ">
      <input
        placeholder="댓글 다는 임시 인풋"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeValue(e.target.value)}
      />
      <Button
        onClick={() => {
          submitReply(mode);
          onClick?.();
        }}
      >
        {mode === 'create' ? '생성' : '완료'}
      </Button>
    </div>
  );
}
