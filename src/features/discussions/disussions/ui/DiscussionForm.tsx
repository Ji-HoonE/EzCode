import { Button } from '@/components/ui/button';
import {
  DISCUSSION_CREATE_VALUE,
  IDiscussionContentMutationRequest,
  TDiscussionContentMutationResponse,
  useCreateDiscussionContent,
  useEditDiscussionContent,
} from '@/entities/discussions';

import {
  ILanguageSelectOption,
  INITIAL_LANG,
  LanguageSelector,
  ProblemId,
  ProblemLanguageType,
} from '@/shared';
import { LANGUAGE } from '@/shared/types/problem.type';
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

  return (
    <div className="relative">
      <LanguageSelector
        currentLanguage={currentLanguage}
        onSelect={(option: ILanguageSelectOption) => {
          setCurrentLanguage(option.value);
          setContentForm((prev) => ({ ...prev, languageId: option.id }));
        }}
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
