export const PATHS = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',

  PROBLEMS: '/problems',
  RANK: '/rank',
  CHAT: {
    BASE: '/chat',
    SETTING: '/chat/setting',
    HOME: '/chat/home',
  },
};

export const getChatRoomPath = (chatRoomId: number) => `${PATHS.CHAT.BASE}/${chatRoomId}`;
