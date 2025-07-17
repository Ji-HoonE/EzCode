import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';
import { IChatMessage, IChatWebSocketStore, INITIAL_STATE } from './useChatWebSocketStore.types';

/** 인증 스토어 */
const useChatWebSocketStore = create<IChatWebSocketStore>()(
  devtools((set) => ({
    ...INITIAL_STATE,
    actions: {
      setIsConnected: (status) => {
        set({
          isConnected: status,
        });
      },

      setInitRooms: (response) => {
        set({
          rooms: Array.isArray(response) ? response : [],
        });
      },

      setRooms: (response) => {
        switch (response.eventType) {
          case 'CREATE': {
            set((state) => {
              return { rooms: [...state.rooms, response] };
            });
          }
          case 'DELETE': {
            set((state) => {
              const filteredRooms = state.rooms.filter((room) => room.roomId !== response.roomId);
              return {
                rooms: filteredRooms,
              };
            });
          }
          case 'UPDATE': {
            set((state) => {
              const updatedRooms = state.rooms.map((room) =>
                room.roomId === response.roomId ? response : room
              );
              return {
                rooms: updatedRooms,
              };
            });
          }
        }
      },

      setInitMessages: (messages) => {
        set({
          messages: Array.isArray(messages) ? messages : [],
        });
      },

      setMessage: (message) => {
        set((state) => {
          const newMessages = [...(state.messages ?? []), message] as Array<IChatMessage>;
          newMessages.sort((a, b) => a.time - b.time);
          return {
            ...state,
            results: newMessages as IChatMessage[],
          };
        });
      },

      clearMessages: () => {
        set({
          messages: [],
        });
      },

      clearStore: () => {
        //초기화
        set({
          ...INITIAL_STATE,
        });
      },
    },
  }))
);

/** 인증 액션 훅 */
export function useChatWebSocketActions() {
  return useChatWebSocketStore(
    useShallow((state) => ({
      setIsConnected: state.actions.setIsConnected,
      setInitRooms: state.actions.setInitRooms,
      setRooms: state.actions.setRooms,
      setInitMessages: state.actions.setInitMessages,
      setMessage: state.actions.setMessage,

      clearMessages: state.actions.clearMessages,
      clearStore: state.actions.clearStore,
    }))
  );
}

export default useChatWebSocketStore;
