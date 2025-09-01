import { IMyInfo } from '@/entities/mypage/model/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: IMyInfo | null;
  setUser: (user: IMyInfo) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IMyInfo) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-storage' } // localStorage key
  )
);
