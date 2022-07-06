import { Chat } from '@/store/Chats/types';

export const findMemberByUsername = (chat: Chat, username: string) => {
  if (!chat) return;
  const { members } = chat;
  return members.find((member: any) => member.username === username);
};
