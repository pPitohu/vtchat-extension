import {
  GET_CHATS,
  IS_CHATS_LOADING,
  GET_CURRENT_CHAT,
  GET_IS_SENDING
} from '@/store/Chats/constants';
import { ChatsState } from '@/store/Chats/types';

export const getters = {
  [GET_CHATS]: (state: ChatsState) => state.chats,
  [IS_CHATS_LOADING]: (state: ChatsState) => state.isLoading,
  [GET_CURRENT_CHAT]: (state: ChatsState) => state.currentChat,
  [GET_IS_SENDING]: (state: ChatsState) => state.isSending
};
