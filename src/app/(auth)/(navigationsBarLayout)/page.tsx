'use client'
import ApiHelper from '@/api/client/api';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import ChatTriggerButton from '@/features/chat/ui/ChatTriggerButton';
import { useLogoutMutation } from '@/query/auth/auth';
import { StartButton } from '@/widgets/ladingCTA';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';


export default function HomePage() {


  const { mutateAsync } = useLogoutMutation();

  // 서버 컴포넌트 사용시 리액트쿼리도 사용불가 그럴때 요청시
  // const fetchUserInfo = async () => {
  //   const response = await ApiHelper.get('/users', { reqType: 'client' });
  //   console.log('response', response);
  // }

  // TODO 로그아웃 api 임의연동
  const handleLogout = async () => {
    try {
      const res = await mutateAsync();
      if (res.data.status === API_CONSTANTS.CODE.OK) {
        await signOut({ redirect: true, callbackUrl: '/signin' });

      }
    } catch (error) {
      console.error(error);
    }
  }
  // TODO 테스트 유저정보 api 임의연동
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await ApiHelper.get('/users', { reqType: 'client' });
      console.log('response', response);
    }
    fetchUserInfo();
  }, []);



  return (
    <main className="w-full bg-gradient flex justify-center h-full pt-20">
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
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </section>
    </main>
  );
}