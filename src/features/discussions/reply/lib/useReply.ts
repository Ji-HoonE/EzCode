import { useCreateReplyMutation, useEditReplyMutation } from '@/entities/discussions';
import { ProblemId } from '@/shared';
import { useState } from 'react';

export default function useReply(
  problemId: ProblemId,
  discussionId: number,
  initialValue: string,
  parentReplyId?: number | null,
  replyId?: number
) {
  const [value, setValue] = useState(initialValue || '');
  const { mutateAsync: create } = useCreateReplyMutation(problemId, discussionId, parentReplyId);
  const { mutateAsync: edit } = useEditReplyMutation(problemId, discussionId, replyId || 0);
  const handleChangeValue = (newValue: string) => {
    setValue(newValue);
  };

  const submitReply = (mode: 'create' | 'edit') => {
    if (mode === 'create') {
      create({ content: value, parentReplyId: parentReplyId || null });
    } else {
      edit({ content: value });
    }
    setValue('');
  };

  return { value, handleChangeValue, submitReply };
}
