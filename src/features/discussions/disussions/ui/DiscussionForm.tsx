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
    <div className="relative">
      <Select
        title="언어 선택"
        value={currentLanguage}
        option={typedOptions}
        setValue={(value) => selectLanguage(value)}
      />
      <textarea
        className="border-1 w-full h-[100px]"
        value={contentForm.content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setContentForm((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <Button className="absolute right-4 top-5" onClick={() => submitDiscussionForm()}>
        {buttonText}
      </Button>
    </div>
  );
}
