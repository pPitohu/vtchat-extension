import {
  SET_CHATS,
  ADD_NEW_CHAT,
  SET_CHAT_MESSAGES,
  SET_IS_SENDING,
  INSERT_NEW_MESSAGE,
  SET_CURRENT_CHAT,
  USER_TYPING
} from '@/store/Chats/constants';
import { Chat, ChatsState, Message } from '@/store/Chats/types';

export const mutations = {
  [SET_CHATS]: (state: ChatsState, chats: Chat[]) => {
    state.chats = chats.map((chat) => ({
      ...chat,
      typing: { username: '', isTyping: false }
    }));
    state.isLoading = false;
  },
  [ADD_NEW_CHAT]: (state: ChatsState, chat: Chat) => {
    state.chats.unshift({ ...chat, typing: { username: '', isTyping: false } });
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
    if (foundChat) foundChat.messages.unshift(chat.msg);
  },
  [SET_CURRENT_CHAT]: (state: ChatsState, chatId: string) => {
    state.currentChat = state.chats.find((c) => c._id === chatId);
  },
  [USER_TYPING]: (
    state: ChatsState,
    data: { chatId: string; username: string; isTyping: boolean }
  ) => {
    const foundChat = state.chats.find((c) => c._id === data.chatId);
    if (foundChat) {
      foundChat.typing = {
        username: data.username,
        isTyping: data.isTyping
      };
    }
  }
};
