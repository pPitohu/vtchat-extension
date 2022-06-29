import {
  SET_CHATS,
  ADD_NEW_CHAT,
  SET_CHAT_MESSAGES,
  SET_IS_SENDING,
  INSERT_NEW_MESSAGE,
  SET_CURRENT_CHAT
} from '@/store/Chats/constants';
import { Chat, ChatsState, Message } from '@/store/Chats/types';

export const mutations = {
  [SET_CHATS]: (state: ChatsState, chats: Chat[]) => {
    state.chats = chats;
    state.isLoading = false;
  },
  [ADD_NEW_CHAT]: (state: ChatsState, chat: Chat) => {
    state.chats.unshift(chat);
  },
  [SET_CHAT_MESSAGES]: (state: ChatsState, chat: Chat) => {
    const foundChat = state.chats.find((c) => c._id === chat._id);
    if (foundChat) foundChat.messages = chat.messages;
  },
  [SET_IS_SENDING]: (state: ChatsState, isSending: boolean) => {
    state.isSending = isSending;
  },
  [INSERT_NEW_MESSAGE]: (
    state: ChatsState,
    chat: { chatId: string; msg: Message }
  ) => {
    const foundChat = state.chats.find((c) => c._id === chat.chatId);
    if (foundChat) foundChat.messages.push(chat.msg);
  },
  [SET_CURRENT_CHAT]: (state: ChatsState, chatId: string) => {
    state.currentChat = state.chats.find((c) => c._id === chatId);
  }
};
