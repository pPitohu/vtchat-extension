export interface User {
  id: number;
  username: string;
  rank: string;
  online: boolean;
  role: 'USER' | 'ADMIN';
}

export interface UsersState {
  users: User[];
  isLoading: boolean;
}

export interface Context {
  state: UsersState;
  commit: (arg0: string, arg1: any) => void;
  dispatch: (arg0: string, arg1: any) => void;
}
