import { PATHS } from '@/constants/paths';
import Image from 'next/image';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <header className="w-full fixed top-0 h-20 px-20 rounded-b-4xl bg-black">
      <div className="flex w-full justify-around items-center h-full">
        <Link href="/">
          <Image
            src="/logo/navigationEzCodeLogo.svg"
            alt="ezCodeLogo.svg"
            width={200}
            height={56}
            priority
          />
        </Link>
        <Link href={PATHS.PROBLEMS}>문제풀이</Link>
        <Link href={PATHS.RANK}>랭킹보기</Link>
        <Image
          src="/icons/notification-icon.svg"
          width={48}
          height={48}
          alt="notification-icon"
          priority
        />
        <Link href={PATHS.SIGNIN}>로그인</Link>
      </div>
    </header>
  );
}
