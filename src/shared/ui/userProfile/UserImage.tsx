import clsx from 'clsx';
import Image from 'next/image';

interface IUserImageProps {
  profileImageUrl: string | null;
  className?: string;
}

export default function UserImage({ profileImageUrl, className = 'size-8' }: IUserImageProps) {
  return (
    <div className={clsx('relative', className)}>
      <Image
        src={profileImageUrl || '/icons/user.svg'}
        alt="유저이미지"
        fill
        unoptimized
        onError={(e) => {
          e.currentTarget.src = '/icons/user.svg';
        }}
        style={{ objectFit: 'contain' }}
      />
      <div className="absolute inset-0 rounded-full bg-gray-500 opacity-30 z-0" />
    </div>
  );
}
