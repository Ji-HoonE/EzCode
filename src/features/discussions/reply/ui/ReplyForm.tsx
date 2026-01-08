import { ChangeEvent, FocusEvent } from 'react';
import { Button } from '@/components/ui/button';
import { ProblemId } from '@/shared';
import useReply from '../lib/useReply';
import { Send } from 'lucide-react';
import UnifiedInput from '@/shared/ui/InputFiled';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = Cookies.get('accessToken');
  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (!accessToken) {
      e.target.blur();
      const params = new URLSearchParams(searchParams.toString());
      params.set('auth-guard', 'true');
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex gap-2 mt-4 w-full">
      <UnifiedInput
        inputType="textarea"
        name="reply"
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeValue(e.target.value)}
        className="rounded-[12px] min-h-10 text-sm"
        onFocus={(e: FocusEvent<HTMLTextAreaElement>) => handleFocus(e)}
      />
      <>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/80 rounded-[10px] px-4 py-2"
          onClick={() => {
            submitReply(mode);
            onClick?.();
          }}
          disabled={!!!accessToken}
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
