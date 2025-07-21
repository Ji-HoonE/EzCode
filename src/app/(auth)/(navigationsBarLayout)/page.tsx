// import ApiHelper from '@/api/client/api';
// import { API_CONSTANTS } from '@/api/constants/api.constants';
import { getWeeklyRankings } from '@/entities/rankings/actions/getRankings.actions';
import Rankings from '@/entities/rankings/ui/Rankings';
import ChatTriggerButton from '@/features/chat/ui/ChatTriggerButton';
// import { useLogoutMutation } from '@/query/auth/auth';

import { StartButton } from '@/widgets/landingCTA';
// import { useQueryClient } from '@tanstack/react-query';
// import { signOut } from 'next-auth/react';
import Image from 'next/image';
// import { useEffect } from 'react';

export default async function HomePage() {
  // const { mutateAsync } = useLogoutMutation();
  // const queryClient = useQueryClient();

  // // TODO 로그아웃 api 임의연동
  // const handleLogout = async () => {
  //   try {
  //     const res = await mutateAsync();
  //     if (res.data.status === API_CONSTANTS.CODE.OK) {
  //       await signOut({ redirect: true, callbackUrl: '/signin' });
  //       // 로그아웃 시 내정보조회하는 api 캐시 무효화
  //       queryClient.invalidateQueries({ queryKey: ['my-info'] });
  //       queryClient.invalidateQueries({ queryKey: ['my-ranking'] });
  //       queryClient.invalidateQueries({ queryKey: ['my-review'] });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // // TODO 테스트 유저정보 api 임의연동
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const response = await ApiHelper.get('/users', { reqType: 'client' });
  //     console.log('response', response);
  //   };
  //   fetchUserInfo();
  // }, []);

  const WeeklyRankings = await getWeeklyRankings();

  return (
    <main className="w-full bg-gradient flex items-center h-full pt-20 flex-col">
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
            {/* <button onClick={handleLogout}>로그아웃</button> */}
          </div>
        </div>
      </section>
      <section>
        <h2>이번 주 랭킹 TOP 10</h2>
        <p>이번 주 가장 활발하게 문제를 해결한 개발자들</p>
        <Rankings rankings={WeeklyRankings} />
      </section>
    </main>
  );
}
