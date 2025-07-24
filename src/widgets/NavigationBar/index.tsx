import { PATHS } from '@/constants/paths';
import LinkedButton from '@/shared/ui/linkedButton';

import Notifications from '../navigation-bar/ui/Notifications';

const NAVIGATE_ATTRIBUTE = {
  root: {
    href: '/',
    content: 'CodeTest',
    className: 'flex items-center space-x-2 text-xl font-bold text-secondary',
    image: { src: '/icons/code.svg', alt: '헤더의 사이트로고', w: 32, h: 32 },
  },
  problems: {
    href: PATHS.PROBLEMS,
    content: '문제 목록',
    className: 'hover:bg-white/8 px-3 py-2 rounded-lg',
  },
  rank: {
    href: PATHS.RANK,
    content: '랭킹',
    className: 'px-3 py-2 rounded-lg hover:bg-white/8 flex items-center gap-1',
    image: { src: '/icons/trophy.svg', alt: '헤더의 랭킹 네비의 로고', w: 16, h: 16 },
  },
  signup: {
    href: PATHS.SIGNUP,
    content: '회원가입',
    className: 'hover:bg-white/8 px-3 py-2 rounded-lg border-gray-600 text-gray-300 border',
  },
  signin: {
    href: PATHS.SIGNIN,
    content: '로그인',
    className: 'bg-primary px-3 py-2 rounded-lg text-white hover:bg-primary/80',
  },
};

export default function NavigationBar() {
  return (
    <header className="border-b border-gray-800 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <nav className="flex w-full justify-around items-center h-full p-4">
        <div className="flex items-center space-x-8">
          <LinkedButton props={NAVIGATE_ATTRIBUTE.root} />
          <LinkedButton props={NAVIGATE_ATTRIBUTE.problems} />
          <LinkedButton props={NAVIGATE_ATTRIBUTE.rank} />
          <Notifications />
        </div>
        <div className="flex items-center space-x-4">
          <LinkedButton props={NAVIGATE_ATTRIBUTE.signup} />
          <LinkedButton props={NAVIGATE_ATTRIBUTE.signin} />
        </div>
      </nav>
    </header>
  );
}
