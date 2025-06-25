import ChatTriggerButton from '@/features/chat/ui/ChatTriggerButton';
import { StartButton } from '@/widgets/ladingCTA';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="w-full bg-gradient flex justify-center h-full pt-27">
      <section>
        <div className="flex items-center">
          <Image src="/logo/EZMainLogo.svg" alt="EZ-MainLogo" width={603} height={603} priority />
          <div className="flex flex-col">
            <h4>EzCode [ez:code] 코딩을 쉽게, 성장은 빠르게</h4>
            <p className="flex flex-col text-right">
              코드가 쉬워지는 순간,
              <Image src="/logo/EzCodeLogo.svg" alt="ezCodeLogo.svg" width={200} height={56} />와
              함께
            </p>
            <StartButton />
            <ChatTriggerButton />
          </div>
        </div>
      </section>
    </main>
  );
}
