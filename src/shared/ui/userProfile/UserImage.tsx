import clsx from 'clsx';

interface IUserImageProps {
  profileImageUrl: string | null;
  className?: string;
}

export default function UserImage({ profileImageUrl, className = 'size-8' }: IUserImageProps) {
  return (
    <div className={clsx('relative', className)}>
      <img
        src={profileImageUrl || '/icons/user.svg'}
        alt="유저 이미지"
        className="rounded-full object-cover z-10 "
      />
      <div className="absolute inset-0 rounded-full bg-gray-500 opacity-30 z-0" />
    </div>
  );
}
