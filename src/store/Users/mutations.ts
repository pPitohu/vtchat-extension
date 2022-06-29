import { SET_ALL_USERS, UPDATE_USER_ONLINE } from '@/store/Users/constants';
import { UsersState, User } from '@/store/Users/types';

export const mutations = {
  [SET_ALL_USERS]: (state: UsersState, users: User[]) => {
    state.users = users;
    state.isLoading = false;
  },
  [UPDATE_USER_ONLINE]: (
    state: UsersState,
    { username, online }: { username: string; online: boolean }
  ) => {
    const foundedUser = state.users.find((u: User) => u.username === username);
    if (foundedUser) foundedUser.online = online;
  }
};
