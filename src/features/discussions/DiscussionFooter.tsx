import ShowChildReplies from './reply/ui/ShowChildReplies';
import { ProblemId } from '@/shared';
import { Vote } from './vote';
import { IDiscussionContentResponse } from '@/entities/discussions/discussions/model/query/discussion.query.type';
import { IReply } from '@/entities/discussions';
import DiscussionDropDown from './DiscussionDropDown';

interface IDiscussionFooterProps {
  problemId: ProblemId;
  content: IDiscussionContentResponse | IReply;
  onDelete: () => void;
  onEdit: () => void;

  replyCount?: number;
  setChildRepliesOpen?: () => void;
  replyId?: number;
}

export default function DiscussionFooter({ ...props }: IDiscussionFooterProps) {
  const { problemId, replyId, replyCount, content, onDelete, onEdit, setChildRepliesOpen } = props;
  return (
    <div className="flex items-center gap-2 ">
      <Vote problemId={problemId} content={content} replyId={replyId} />
      {replyCount !== undefined && (
        <ShowChildReplies onClick={() => setChildRepliesOpen?.()} replyCount={replyCount} />
      )}
      <DiscussionDropDown isAuthor={content.isAuthor} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}
