import { Context, Chat, Message } from '@/store/Chats/types';
import {
  SOCKET_GET_CHATS,
  SET_CHATS,
  SOCKET_NEW_CHAT,
  SOCKET_EXISTING_CHAT,
  ADD_NEW_CHAT,
  SET_CHAT_MESSAGES,
  SOCKET_NEW_MESSAGE,
  INSERT_NEW_MESSAGE,
  SOCKET_USER_TYPING,
  USER_TYPING
} from '@/store/Chats/constants';

export const actions = {
  [SOCKET_GET_CHATS]: ({ commit }: Context, chats: Chat[]) => {
    commit(SET_CHATS, chats);
  },
  [SOCKET_NEW_CHAT]: ({ commit }: Context, chat: Chat) => {
    console.log('new chat', chat);
    commit(ADD_NEW_CHAT, chat);
  },
  [SOCKET_EXISTING_CHAT]: ({ commit }: Context, chat: Chat) => {
    console.log('existing', chat);
    commit(SET_CHAT_MESSAGES, chat);
  },
  [SOCKET_NEW_MESSAGE]: (
    { commit }: Context,
    chat: { chatId: string; msg: Message }
  ) => {
    console.log('new message', chat);
    commit(INSERT_NEW_MESSAGE, chat);
  },
  [SOCKET_USER_TYPING]: (
    { commit }: Context,
    data: { chatId: string; username: string; isTyping: boolean }
  ) => {
    commit(USER_TYPING, data);
  }
};
