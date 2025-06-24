import Link from 'next/link';

export default function ChatFooterNavigation() {
  return (
    <div className="fixed  w-full bottom-0">
      <div className="flex w-full justify-around">
        <Link href={'/'}>홈</Link>
        <Link href={'/'}>채팅</Link>
        <Link href={'/'}>설정</Link>
      </div>
    </div>
  );
}
