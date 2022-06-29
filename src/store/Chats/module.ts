import { getters } from '@/store/Chats/getters';
import { mutations } from '@/store/Chats/mutations';
import { actions } from '@/store/Chats/actions';
import { ChatsState } from '@/store/Chats/types';

const state: ChatsState = {
  currentChat: {
    _id: '',
    members: ['', ''],
    messages: []
  },
  chats: [],
  isLoading: true,
  isSending: false
};

export default {
  state,
  getters,
  actions,
  mutations
};
