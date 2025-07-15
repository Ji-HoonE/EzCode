import Image from 'next/image';

interface IShowChildReplies {
  onClick: () => void;
  replyCount: number;
}
export default function ShowChildReplies({ onClick, replyCount }: IShowChildReplies) {
  return (
    <button className="flex items-center" onClick={onClick}>
      <Image
        alt="댓글보기 아이콘"
        src="/icons/discussion/replies.icon.svg"
        width={17}
        height={17}
      />
      <p>답글 {replyCount}개</p>
    </button>
  );
}
