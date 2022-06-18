export interface Message {
  id: number;
  text: string;
  date: string;
}

export interface Messages {
  sendTo: number | string;
  messagesList: Message[];
}

export interface MessagesState {
  messages: Messages[];
}

export interface Context {
  state: MessagesState;
  commit: (arg0: string, arg1: any) => void;
  dispatch: (arg0: string, arg1: any) => any;
}
