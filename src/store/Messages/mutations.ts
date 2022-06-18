import { SOCKET_CHAT_MESSAGE } from '@/store/Messages/constants';
import { Messages, MessagesState } from './types';

export const mutations = {
  [SOCKET_CHAT_MESSAGE]: (state: MessagesState, payload: Messages) => {
    state.messages.push(payload);
  }
};
