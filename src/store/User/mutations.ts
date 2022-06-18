import { SET_USER } from '@/store/User/constants';
import { UserState, User } from '@/store/User/types';

export const mutations = {
  [SET_USER]: (state: UserState, user: User) => {
    state.user = user;
  }
};
