import UserImage from './UserImage';

interface IUserProfileProps {
  profileImageUrl: string | undefined;
  nickname: string | undefined;
}
export default function UserProfile({ profileImageUrl, nickname }: IUserProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <UserImage profileImageUrl={profileImageUrl || ''} />
      <span className="font-medium text-secondary text-sm">{nickname || ''}</span>
    </div>
  );
}
