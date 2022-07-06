import { Chat } from '@/store/Chats/types';
import { User } from '@/store/User/types';

export const findChatByUsernames = (
  chats: Chat[],
  sender: User,
  reciever: User
) => {
  return chats.find((c: Chat) => {
    const firstMemberUsername = c.members[0].username;
    const secondMemberUsername = c.members[1].username;
    return (
      (firstMemberUsername === sender.username &&
        secondMemberUsername === reciever.username) ||
      (firstMemberUsername === reciever.username &&
        secondMemberUsername === sender.username)
    );
  });
};
