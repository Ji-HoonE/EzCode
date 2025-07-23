import { Button } from '@/components/ui/button';
import { PATHS } from '@/constants/paths';
import Image from 'next/image';
import Link from 'next/link';

export default function StartButton() {
  const isLoggedIn = true;
  const path = isLoggedIn ? PATHS.SIGNIN : PATHS.SIGNIN;

  return (
    <Link href={path}>
      <Button
        size="lg"
        className="bg-[#00d084] hover:bg-[#00b870] text-black font-semibold px-8 py-4 rounded-[20px] shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
      >
        <Image
          src="/icons/target.svg"
          width={20}
          height={20}
          alt="메인페이지 시작하기 버튼 이미지"
        />
        지금 시작하기
      </Button>
    </Link>
  );
}
