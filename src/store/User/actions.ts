import { STORE_USER, GET_USER, SET_USER } from '@/store/User/constants';
import { Context, User } from '@/store/User/types';

export const actions = {
  [STORE_USER]: async ({ commit }: Context, user: User) => {
    commit(SET_USER, user);
  },
  [GET_USER]: async ({ commit }: Context) => {
    return '';
  }
};
