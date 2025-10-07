import { PATHS } from '@/constants/paths';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-5">
      <h1 className="text-2xl font-bold">
        문제가 삭제되었거나 문제 오류 발견으로 수정중인 문제 입니다.
      </h1>
      <Link href={PATHS.PROBLEMS} className="bg-primary p-5 rounded-lg text-white">
        문제 목록으로 돌아가기
      </Link>
    </div>
  );
}
