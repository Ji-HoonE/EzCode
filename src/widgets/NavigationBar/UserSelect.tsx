import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function UserSelect() {
  return (
    <div>
      <div>
        <Button
          variant="ghost"
          className="text-white hover:text-secondary hover:bg-white/8 transition-all duration-200 hover:shadow-lg"
        >
          <Image src="/icons/user.svg" height={20} width={20} alt="유저 아이콘" />
          계정
          <p className="h-4 w-4 ml-2">\/</p>
        </Button>
      </div>
      <ul className="bg-[#1a2332] border-gray-700 text-white hover:bg-white/8 hover:text-secondary">
        <li>마이페이지</li>
        <li>로그아웃</li>
      </ul>
    </div>
  );
}
