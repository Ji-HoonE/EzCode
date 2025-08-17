import { PATHS } from '@/constants/paths';

export const NAVIGATE_ATTRIBUTE = {
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
    href: PATHS.SIGNIN,
    content: '회원가입',
    className: 'hover:bg-white/8 px-3 py-2 rounded-lg border-gray-600 text-gray-300 border',
  },
  signin: {
    href: PATHS.SIGNIN,
    content: '로그인',
    className: 'bg-primary px-3 py-2 rounded-lg text-white hover:bg-primary/80',
  },
};

export const AUTH_ACTIONS_OPTIONS = [
  { label: '마이페이지', value: 'mypage' },
  { label: '로그아웃', value: 'logout' },
];
