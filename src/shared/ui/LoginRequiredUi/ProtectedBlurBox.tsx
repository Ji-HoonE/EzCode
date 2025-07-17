import { Button } from '@/components/ui/button';
import { PATHS } from '@/constants/paths';
import clsx from 'clsx';
import Link from 'next/link';

export default function ProtectedBlurBox() {
  return (
    <div
      className={clsx(
        'flex justify-center items-center bg-white/20 backdrop-blur-sm pointer-events-auto rounded-md absolute z-25 inset-0'
      )}
    >
      <div className="flex flex-col items-center">
        <p>로그인이 필요한 서비스에요!</p>
        <Link href={PATHS.SIGNIN}>
          <Button>로그인 하러 가기</Button>
        </Link>
      </div>
    </div>
  );
}
