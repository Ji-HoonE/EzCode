import { PATHS } from '@/constants/paths';
import Image from 'next/image';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <header className="w-full fixed top-0 h-[110px]">
      <div className="flex justify-around items-center">
        <Link href="/">
          <Image src="/logo/EZcodeLogo.svg" alt="ezCodeLogo.svg" width={200} height={56} />
        </Link>
        <Link href={PATHS.CODING_TEST}>문제풀이</Link>
        <Link href={PATHS.COMMUNITY}>커뮤니티</Link>
        <Link href={PATHS.BUSINESS}>기업서비스</Link>
        <Link href={PATHS.LOGIN}>로그인</Link>
      </div>
    </header>
  );
}
