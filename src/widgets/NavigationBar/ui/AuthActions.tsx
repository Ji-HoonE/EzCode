'use client';

import LinkedButton from '@/shared/ui/linkedButton';
import { AUTH_ACTIONS_OPTIONS, NAVIGATE_ATTRIBUTE } from '../navigateAttribute';
import { Select } from '@/shared/ui/select/Select';
import UserProfile from '@/shared/ui/userProfile';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/constants/paths';
import { useLogoutMutation } from '@/entities/auth/model/mutation/auth.mutation';

import Notifications from './Notifications';
import { useUserStore } from '@/entities/user/model/store';

export default function AuthActions() {
  const router = useRouter();
  const { mutateAsync } = useLogoutMutation();
  const { user } = useUserStore((state) => state);

  const selectOption = (value: string) => {
    if (value === 'mypage') return router.push(PATHS.MYPAGE);
    if (value === 'logout') return mutateAsync();
  };

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex flex-row gap-4 items-center">
          <Notifications />
          <Select
            option={AUTH_ACTIONS_OPTIONS}
            title="사용자 메뉴"
            setValue={(value) => {
              selectOption(value);
            }}
            isHeader
            value={
              <UserProfile profileImageUrl={user?.profileImageUrl} nickname={user?.nickname} />
            }
            className="text-white transition-all duration-200"
          />
        </div>
      ) : (
        <>
          {/* <LinkedButton props={NAVIGATE_ATTRIBUTE.signup} /> */}
          <LinkedButton props={NAVIGATE_ATTRIBUTE.signin} />
        </>
      )}
    </div>
  );
}
