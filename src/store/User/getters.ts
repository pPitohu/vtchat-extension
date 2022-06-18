import { GET_USER } from '@/store/User/constants';
import { UserState } from '@/store/User/types';

export const getters = {
  [GET_USER]: (state: UserState) => state.user
};
