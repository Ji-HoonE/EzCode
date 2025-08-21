'use client';

import LinkedButton from '@/shared/ui/linkedButton';
import { AUTH_ACTIONS_OPTIONS, NAVIGATE_ATTRIBUTE } from '../navigateAttribute';
import { Select } from '@/shared/ui/select/Select';
import { useEffect, useState } from 'react';
import { useMyInfoQuery } from '@/entities/mypage/model/query';
import UserProfile from '@/shared/ui/userProfile';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/constants/paths';
import { useLogoutMutation } from '@/entities/auth/model/mutation/auth.mutation';
import { useSession } from 'next-auth/react';

interface IUserInfo {
  profileImage: string;
  nickname: string;
}

export default function AuthActions() {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const { data: session } = useSession();
  const { data } = useMyInfoQuery();
  const router = useRouter();
  const { mutateAsync } = useLogoutMutation();

  useEffect(() => {
    setUserInfo({
      profileImage: data?.data.result.profileImageUrl || '',
      nickname: data?.data.result.nickname || '',
    });
  }, [data?.data.result]);

  const accessToken = session?.accessToken?.split(' ')[1] as string;

  const selectOption = (value: string) => {
    if (value === 'mypage') return router.push(PATHS.MYPAGE);
    if (value === 'logout') return mutateAsync();
  };

  return (
    <div className="flex items-center space-x-4">
      {accessToken ? (
        <Select
          option={AUTH_ACTIONS_OPTIONS}
          title="사용자 메뉴"
          setValue={(value) => {
            selectOption(value);
          }}
          value={
            <UserProfile profileImageUrl={userInfo?.profileImage} nickname={userInfo?.nickname} />
          }
          className="text-white transition-all duration-200"
        />
      ) : (
        <>
          {/* <LinkedButton props={NAVIGATE_ATTRIBUTE.signup} /> */}
          <LinkedButton props={NAVIGATE_ATTRIBUTE.signin} />
        </>
      )}
    </div>
  );
}
