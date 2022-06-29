export interface Message {
  id: string;
  text: string;
  datetime: Date;
  sender: string;
  reciever: string;
}

export interface Chat {
  _id: string;
  members: [string, string];
  messages: Message[];
}

export interface ChatsState {
  currentChat: Chat | undefined;
  chats: Chat[];
  isLoading: boolean;
  isSending: boolean;
}

export interface Context {
  state: ChatsState;
  commit: (arg0: string, arg1: any) => void;
  dispatch: (arg0: string, arg1: any) => void;
}
