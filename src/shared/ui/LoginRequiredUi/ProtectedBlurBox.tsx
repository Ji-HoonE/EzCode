'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface IProtectedBlurBoxProps {
  className?: string;
}
export default function ProtectedBlurBox({ className }: IProtectedBlurBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const authGuardTrigger = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('auth-guard', 'true');
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        'flex justify-center items-center bg-white/20 backdrop-blur-sm pointer-events-auto rounded-md absolute z-25 inset-0',
        className
      )}
    >
      <div className="flex flex-col gap-3 items-center">
        <p>로그인이 필요한 서비스에요!</p>
        <Button onClick={authGuardTrigger}>로그인 하기</Button>
      </div>
    </div>
  );
}
