import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TabType = 'login' | 'signup';

interface initialAuthState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  resetTab: () => void;
}

export const useAuthStore = create<initialAuthState>()(
  devtools((set) => ({
    activeTab: 'login',
    setActiveTab: (tab) => set({ activeTab: tab }),
    resetTab: () => set({ activeTab: 'login' }),
    name: 'sign-form-store',
  }))
);
