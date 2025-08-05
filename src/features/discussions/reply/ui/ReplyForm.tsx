import { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { ProblemId } from '@/shared';
import useReply from '../lib/useReply';
import { Send } from 'lucide-react';
import UnifiedInput from '@/shared/ui/unifiedInput';

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
      <UnifiedInput
        inputType="textarea"
        name="reply"
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeValue(e.target.value)}
        className="rounded-[12px] min-h-10 text-sm"
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
