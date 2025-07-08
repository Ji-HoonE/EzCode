import { IDiscussionContentResponse } from '@/features/problem/types/discussion.response.data.type';

interface IDiscussionContentProps {
  discussionContent: IDiscussionContentResponse;
}

export default function DiscussionContent({ discussionContent }: IDiscussionContentProps) {
  const { userInfo, content } = discussionContent;
  return (
    <div className="w-full">
      <h3>닉네임: {userInfo.nickname}</h3>
      <p>{content}</p>
    </div>
  );
}
