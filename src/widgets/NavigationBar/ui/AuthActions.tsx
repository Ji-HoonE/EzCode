'use client';

import LinkedButton from '@/shared/ui/linkedButton';
import { AUTH_ACTIONS_OPTIONS, NAVIGATE_ATTRIBUTE } from '../navigateAttribute';
import { Select } from '@/shared/ui/select/Select';
import useAccessToken from '@/shared/hooks/useAuthToken';

export default function AuthActions() {
  const accessToken = useAccessToken();

  return (
    <div className="flex items-center space-x-4">
      {accessToken ? (
        <Select
          option={AUTH_ACTIONS_OPTIONS}
          title="타이틀"
          setValue={() => {}}
          value="value"
          className="text-white transition-all duration-200"
        />
      ) : (
        /* <div>
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
        </ul> */
        <>
          <LinkedButton props={NAVIGATE_ATTRIBUTE.signup} />
          <LinkedButton props={NAVIGATE_ATTRIBUTE.signin} />
        </>
      )}
    </div>
  );
}
