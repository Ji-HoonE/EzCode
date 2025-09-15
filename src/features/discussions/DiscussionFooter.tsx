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
  id: number;
  type: 'discussion' | 'reply';
  variant: 'POST' | 'COMMENT';
}

export default function DiscussionFooter({ ...props }: IDiscussionFooterProps) {
  const { problemId, replyCount, id, content, type, onDelete, onEdit, setChildRepliesOpen } = props;

  return (
    <div className="flex items-center gap-2">
      <Vote problemId={problemId} content={content} id={id} type={type} />
      {replyCount !== undefined && (
        <ShowChildReplies onClick={() => setChildRepliesOpen?.()} replyCount={replyCount} />
      )}
      <DiscussionDropDown
        isAuthor={content.isAuthor}
        onDelete={onDelete}
        onEdit={onEdit}
        reportTargetId={id}
        variant={props.variant}
      />
    </div>
  );
}
