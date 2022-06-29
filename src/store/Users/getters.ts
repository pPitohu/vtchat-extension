import {
  GET_ALL_USERS,
  GET_USER_BY_NAME,
  IS_USER_LOADING
} from '@/store/Users/constants';
import { User, UsersState } from '@/store/Users/types';

export const getters = {
  [GET_ALL_USERS]: (state: UsersState) => state.users,
  [GET_USER_BY_NAME]: (state: UsersState) => (username: string) =>
    state.users.find((user: User) => user.username === username),
  [IS_USER_LOADING]: (state: UsersState) => state.isLoading
};
