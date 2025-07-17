import { PATHS } from '@/constants/paths';
import Link from 'next/link';

export default function StartButton() {
  const isLoggedIn = true;
  const path = isLoggedIn ? PATHS.SIGNIN : PATHS.SIGNIN;

  return (
    <Link href={path}>
      <div className="bg-white text-black">여정 참여하기</div>
    </Link>
  );
}
