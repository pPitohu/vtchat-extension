import { getters } from '@/store/User/getters';
import { mutations } from '@/store/User/mutations';
import { actions } from '@/store/User/actions';
import { UserState } from '@/store/User/types';

const state: UserState = {
  user: {
    id: -1,
    username: '',
    rank: 'PLAYER',
    online: false,
    role: 'USER'
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
