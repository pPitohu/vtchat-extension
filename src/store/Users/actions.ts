import {
  SOCKET_USER_UPDATE_ONLINE,
  SOCKET_ALL_USERS,
  SET_ALL_USERS,
  UPDATE_USER_ONLINE
} from '@/store/Users/constants';
import { Context, User } from '@/store/Users/types';

export const actions = {
  [SOCKET_USER_UPDATE_ONLINE]: async ({ commit }: Context, user: User) => {
    commit(UPDATE_USER_ONLINE, user);
  },
  [SOCKET_ALL_USERS]: async ({ commit }: Context, users: User[]) => {
    commit(SET_ALL_USERS, users);
  }
};
