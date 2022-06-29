import { getters } from '@/store/Users/getters';
import { mutations } from '@/store/Users/mutations';
import { actions } from '@/store/Users/actions';
import { UsersState } from '@/store/Users/types';

const state: UsersState = {
  users: [],
  isLoading: true
};

export default {
  state,
  getters,
  actions,
  mutations
};
