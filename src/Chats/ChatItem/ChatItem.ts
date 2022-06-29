/* eslint-disable @typescript-eslint/no-empty-function */
import { socketEmit } from '@/helpers/socket';
import router from '@/router';
import store from '@/store';
import {
  GET_CHATS,
  INIT_CHAT,
  SET_CURRENT_CHAT
} from '@/store/Chats/constants';
import { Chat } from '@/store/Chats/types';
import { GET_USER } from '@/store/User/constants';
import { User } from '@/store/Users/types';
import { computed, onMounted } from '@vue/composition-api';

const useChatItem = ({ user }: { user: User }) => {
  const currentUser = computed(() => store.getters[GET_USER]);
  const chats = computed(() => store.getters[GET_CHATS]);
  const currentChat = computed(() =>
    chats.value.find((c: Chat) => {
      return (
        JSON.stringify(c.members) ===
          JSON.stringify([currentUser.value.username, user.username]) ||
        JSON.stringify(c.members) ===
          JSON.stringify([user.username, currentUser.value.username])
      );
    })
  );
  const lastMessageText = computed(() => {
    const chat = currentChat.value;
    if (!chat) return '';
    return chat.messages[chat.messages.length - 1]?.text;
  });

  const chooseChat = () => {
    socketEmit(INIT_CHAT, {
      username: user.username
    });
    store.commit(SET_CURRENT_CHAT, currentChat.value?._id);
    router.push(
      {
        name: 'chats',
        params: { username: user.username }
      },
      () => {}
    );
  };
  return {
    chooseChat,
    lastMessageText
  };
};

export default useChatItem;
