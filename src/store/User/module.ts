import { getters } from '@/store/User/getters';
import { mutations } from '@/store/User/mutations';
import { actions } from '@/store/User/actions';
import { UserState } from '@/store/User/types';

const state: UserState = {
  user: {
    ac: 0,
    anon: 0,
    cid: '',
    clan: 0,
    rank: '',
    username: '',
    vime_id: 0,
    vk_id: 0
  },
  isAuthorized: false,
  isStored: false
};

export default {
  state,
  getters,
  actions,
  mutations
};
