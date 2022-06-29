import { Context, User } from '@/store/User/types';
import { SOCKET_SET_USER, SET_USER } from '@/store/User/constants';

export const actions = {
  [SOCKET_SET_USER]: ({ commit }: Context, user: User) => {
    commit(SET_USER, user);
  }
};
