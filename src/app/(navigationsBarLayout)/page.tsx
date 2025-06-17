import Image from 'next/image';

export default function HomePage() {
  return (
    <div>
      <h4>Easy to start, Easy to grow</h4>
      <h1 className="flex">
        <Image src="/logo/EZlogo.svg" alt="/logo/EZlogo.svg" width={94} height={66} />: Easy code;
        코딩을 쉽게, 성장은 빠르게
      </h1>
      <section className="flex items-center">
        <Image src="/logo/EZMainLogo.svg" alt="EZ-MainLogo" width={603} height={603} />
        <section className="flex flex-col text-right">
          <p> 코드가 쉬워지는 순간,</p>
          <p className="flex items-center">
            <Image src="/logo/EZcodeLogo.svg" alt="ezCodeLogo.svg" width={200} height={56} />와 함께
          </p>
        </section>
      </section>
    </div>
  );
}
