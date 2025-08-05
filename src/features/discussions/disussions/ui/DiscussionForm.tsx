'use client';
import { Button } from '@/components/ui/button';
import {
  DISCUSSION_CREATE_VALUE,
  IDiscussionContentMutationRequest,
  useCreateDiscussionContent,
  useEditDiscussionContent,
} from '@/entities/discussions';
import { TDiscussionContentMutationResponse } from '@/entities/discussions/discussions/model/mutation/discussions.types';

import { INITIAL_LANG, ProblemId, ProblemLanguageType } from '@/shared';
import { LANGUAGE_SELECTOR_OPTIONS } from '@/shared/lib/codemirror';
import { LANGUAGE, LANGUAGE_ID } from '@/shared/types/problem.type';
import { OptionType, Select } from '@/shared/ui/select/Select';
import UnifiedInput from '@/shared/ui/unifiedInput';
import { ChangeEvent, useState } from 'react';

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
  const [currentLanguage, setCurrentLanguage] = useState<ProblemLanguageType>(
    discussion ? LANGUAGE[discussion.languageId] : INITIAL_LANG
  );

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
  const buttonText = mode === 'create' ? '토론 생성' : '토론 수정';
  const typedOptions = LANGUAGE_SELECTOR_OPTIONS as OptionType[];

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
    const typedValue = value as ProblemLanguageType;
    setCurrentLanguage(typedValue);
    setContentForm((prev) => ({ ...prev, languageId: LANGUAGE_ID[typedValue] }));
  };

  return (
    <div className="relative flex flex-col gap-3">
      <Select
        title="언어 선택"
        value={currentLanguage}
        option={typedOptions}
        setValue={(value) => selectLanguage(value)}
      />
      <UnifiedInput
        inputType="textarea"
        value={contentForm.content}
        name="discussion"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setContentForm((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <div className="absolute right-4 top-[calc(50%-5px)] flex gap-2">
        <Button className="" onClick={() => submitDiscussionForm()}>
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
