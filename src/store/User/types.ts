/* eslint-disable camelcase */
export interface User {
  id: number;
  username: string;
  rank: string;
  online: boolean;
  role: 'USER' | 'ADMIN';
}

export interface UserState {
  user: User;
}

export interface Context {
  state: UserState;
  commit: (arg0: string, arg1: any) => void;
  dispatch: (arg0: string, arg1: any) => void;
}
