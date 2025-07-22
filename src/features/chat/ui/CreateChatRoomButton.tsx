import Image from 'next/image';

export default function CreateChatRoomButton() {
  return (
    <div className="flex justify-center items-center rounded-[999px] bg-secondary w-9 h-9">
      <Image width={24} height={24} src="/icons/plus.svg" alt="생성하기 버튼" />
    </div>
  );
}
