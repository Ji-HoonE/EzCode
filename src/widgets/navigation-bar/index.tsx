import { PATHS } from '@/constants/paths';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @todo
 * * 로그인 버튼으로 바꾸기
 */

export default function NavigationBar() {
  return (
    <header className="w-full fixed top-0 h-27 px-20">
      <div className="flex justify-around items-center">
        <Link href="/">
          <Image
            src="/logo/navigationEzCodeLogo.svg"
            alt="ezCodeLogo.svg"
            width={200}
            height={56}
            priority
          />
        </Link>
        <Link href={PATHS.CODING_TEST}>문제풀이</Link>
        <Link href={PATHS.COMMUNITY}>랭킹보기</Link>
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
