import { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { ProblemId } from '@/shared';
import useReply from '../lib/useReply';
import { Send } from 'lucide-react';

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
    <div className="flex gap-2 mt-4 w-full">
      <textarea
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeValue(e.target.value)}
        placeholder="댓글을 작성하세요..."
        className="w-full p-2 bg-background border-border_primary rounded-[14px] resize-none min-h-[40px] text-sm"
      />
      <>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/80 rounded-[10px] px-4 py-2"
          onClick={() => {
            submitReply(mode);
            onClick?.();
          }}
        >
          {mode === 'create' ? <Send className="w-4 h-4" /> : '완료'}
        </Button>
        {mode === 'edit' && (
          <Button
            size="sm"
            variant="outline"
            className="rounded-[10px] px-4 py-2"
            onClick={onClick}
          >
            취소
          </Button>
        )}
      </>
    </div>
  );
}
