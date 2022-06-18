import { getters } from '@/store/User/getters';
import { mutations } from '@/store/User/mutations';
import { actions } from '@/store/User/actions';
import { MessagesState } from '@/store/Messages/types';

const state: MessagesState = {
  messages: []
};

export default {
  state,
  getters,
  actions,
  mutations
};
