'use client';
import { Button } from '@/components/ui/button';
import {
  DISCUSSION_CREATE_VALUE,
  IDiscussionContentMutationRequest,
  useCreateDiscussionContent,
  useEditDiscussionContent,
} from '@/entities/discussions';
import { TDiscussionContentMutationResponse } from '@/entities/discussions/discussions/model/mutation/discussions.types';
import { LANGUAGE_SELECTOR_OPTIONS, ProblemId } from '@/shared';
import { Select } from '@/shared/ui/select/Select';
import UnifiedInput from '@/shared/ui/InputFiled';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { useUserStore } from '@/entities/user/model/store';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
interface ICreateDiscussionInputProps {
  problemId: ProblemId;
  mode: 'create' | 'edit';
  discussion?: TDiscussionContentMutationResponse;
  changeEditMode?: (status: boolean) => void;
}

export default function DiscussionForm({
  problemId,
  mode = 'create',
  discussion,
  changeEditMode,
}: ICreateDiscussionInputProps) {
  const [contentForm, setContentForm] = useState<IDiscussionContentMutationRequest>(
    discussion
      ? { content: discussion.content, languageId: discussion.languageId }
      : DISCUSSION_CREATE_VALUE
  );
  const { mutateAsync: createDiscussion } = useCreateDiscussionContent(problemId);
  const { mutateAsync: editMutate } = useEditDiscussionContent(
    String(problemId),
    discussion?.discussionId || 0
  );
  const { user } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = Cookies.get('accessToken');

  const buttonText = mode === 'create' ? '토론 생성' : '토론 수정';

  const submitDiscussionForm = () => {
    if (mode === 'create') {
      createDiscussion(contentForm);
      setContentForm((prev) => ({ ...prev, content: '' }));
    }
    if (mode === 'edit') {
      editMutate(contentForm);
      changeEditMode?.(false);
    }
  };

  const selectLanguage = (value: string) => {
    const languageId = Number(value); //select 컴포넌트에서 value를 string으로 받기 때문에 number로 변환
    setContentForm((prev) => ({ ...prev, languageId: languageId }));
  };

  useEffect(() => {
    if (discussion || !user) return;

    setContentForm((prev) => ({ ...prev, languageId: user?.language?.id as number }));
  }, [user?.language]);

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (!accessToken) {
      e.target.blur();
      const params = new URLSearchParams(searchParams.toString());
      params.set('auth-guard', 'true');
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="relative flex flex-col gap-3">
      <Select
        title="언어 선택"
        value={contentForm.languageId.toString()}
        option={LANGUAGE_SELECTOR_OPTIONS}
        setValue={(value) => selectLanguage(value)}
      />
      <UnifiedInput
        inputType="textarea"
        value={contentForm.content}
        name="discussion"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setContentForm((prev) => ({ ...prev, content: e.target.value }))
        }
        onFocus={(e: FocusEvent<HTMLTextAreaElement>) => handleFocus(e)}
      />
      <div className="absolute right-4 top-[calc(50%-5px)] flex gap-2">
        <Button className="" onClick={() => submitDiscussionForm()} disabled={!!!accessToken}>
          {buttonText}
        </Button>
        {mode === 'edit' && (
          <Button className="" onClick={() => changeEditMode?.(false)}>
            취소
          </Button>
        )}
      </div>
    </div>
  );
}
