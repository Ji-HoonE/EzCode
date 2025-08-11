//ui
export { default as ChatTriggerButton } from '../../widgets/globalFloatingWidget/ui/ChatDialogOpenButton';
export { default as ChatInput } from './ui/chatRoom/ChatInput';
export { default as CreateChatRoom } from './ui/CreateChatRoomDialog';
export { default as ChatRoom } from './ui/chatRoom/index';
export { default as ChatRoomList } from './ui/chatRoomList/index';

//hooks
export { default as useConnectWebSocket } from './hooks/socket/useConnectChatWebSocket';
export { default as useJoinChatRoom } from './hooks/socket/useJoinChatRoom';
export { default as useSubChatRooms } from './hooks/socket/useSubChatRooms';

export type { ChatRoomId } from './types/index';
export type { ChatRoomPageProps } from './types/index';
