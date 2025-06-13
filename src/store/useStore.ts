import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StoreState {
  // 상태
  count: number;
  // 액션
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        // 초기 상태
        count: 0,
        // 액션
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      {
        name: "app-storage", // 로컬 스토리지에 저장될 키 이름
      }
    )
  )
);
