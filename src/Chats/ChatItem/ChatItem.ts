/* eslint-disable @typescript-eslint/no-empty-function */
import { socketEmit } from '@/helpers/socket';
import router from '@/router';
import store from '@/store';
import {
  GET_CHATS,
  INIT_CHAT,
  SET_CURRENT_CHAT
} from '@/store/Chats/constants';
import { GET_USER } from '@/store/User/constants';
import { User } from '@/store/Users/types';
import { computed } from '@vue/composition-api';
import { findChatByUsernames } from '@/helpers/findChatByUsernames';

const useChatItem = ({ user }: { user: User }) => {
  const currentUser = computed(() => store.getters[GET_USER]);
  const chats = computed(() => store.getters[GET_CHATS]);
  const currentChat = computed(() =>
    findChatByUsernames(chats.value, currentUser.value, user)
  );
  const isTyping = computed(
    () =>
      currentChat.value?.typing?.isTyping &&
      currentChat.value.typing.username === user.username
  );
  const lastMessageText = computed(() => {
    const chat = currentChat.value;
    if (!chat) return '';
    return chat.messages[0]?.text;
  });

  const chooseChat = () => {
    socketEmit(INIT_CHAT, { sender: currentUser.value, reciever: user });
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
    lastMessageText,
    isTyping
  };
};

export default useChatItem;
