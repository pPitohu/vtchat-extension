/* eslint-disable camelcase */
export interface User {
  ac: number;
  anon: number;
  cid: string;
  clan: number;
  rank: string;
  username: string;
  vime_id: number;
  vk_id: number;
}

export interface UserState {
  user: User;
  isAuthorized: boolean;
  isStored: boolean;
}

export interface Context {
  state: UserState;
  commit: (arg0: string, arg1: any) => void;
  dispatch: (arg0: string, arg1: any) => any;
}
