import router from '@/router';
import store from '@/store';
import moment from 'moment';
import { GET_USER_BY_NAME } from '@/store/Users/constants';
import {
  GET_CURRENT_CHAT,
  SET_IS_SENDING,
  CHAT_MESSAGE,
  CONNECT_TO_CHAT,
  GET_IS_SENDING,
  SET_CURRENT_CHAT,
  GET_CHATS,
  USER_TYPING
} from '@/store/Chats/constants';
import { GET_USER } from '@/store/User/constants';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from '@vue/composition-api';
import { socketEmit } from '@/helpers/socket';
import { findChatByUsernames } from '@/helpers/findChatByUsernames';
import { throttle } from 'lodash';

const useSelectedChat = () => {
  const sender = computed(() => store.getters[GET_USER]);
  const reciever = computed(() =>
    store.getters[GET_USER_BY_NAME](router.currentRoute.params.username)
  );
  const chats = computed(() => store.getters[GET_CHATS]);
  const currentChat = computed(() => store.getters[GET_CURRENT_CHAT]);
  const isTyping = computed(
    () =>
      currentChat.value?.typing?.isTyping &&
      currentChat.value.typing.username === reciever.value.username
  );
  const isSending = computed(() => store.getters[GET_IS_SENDING]);
  const initialLimit = 40;
  const messagesLimit = ref(initialLimit);
  const messages = computed(() =>
    currentChat.value?.messages.slice(0, messagesLimit.value)
  );
  const message = ref('');

  const loadMoreMessages = () => {
    if (
      currentChat.value.messages.length - messagesLimit.value >
      initialLimit
    ) {
      messagesLimit.value += initialLimit;
    } else {
      if (messagesLimit.value === currentChat.value.messages.length) return;
      messagesLimit.value +=
        currentChat.value.messages.length - messagesLimit.value;
    }
  };

  onMounted(() => {
    setTimeout(() => {
      const chatId = findChatByUsernames(
        chats.value,
        sender.value,
        reciever.value
      )?._id;
      chatId && store.commit(SET_CURRENT_CHAT, chatId);
    }, 200);
    watch([currentChat, sender, reciever, messages], () =>
      socketEmit(CONNECT_TO_CHAT, {
        chatId: currentChat.value?._id
      })
    );
  });
  watch(
    message,
    throttle((v: string) => {
      if (v.length > 0) {
        socketEmit(USER_TYPING, {
          chatId: currentChat.value?._id,
          username: sender.value.username,
          isTyping: true
        });
      } else {
        socketEmit(USER_TYPING, {
          chatId: currentChat.value?._id,
          username: sender.value.username,
          isTyping: false
        });
      }
    }, 1000)
  );
  onBeforeUnmount(() => {
    socketEmit(USER_TYPING, {
      chatId: currentChat.value?._id,
      username: sender.value.username,
      isTyping: false
    });
  });

  const sendMessage = (cb: () => void) => {
    if (!message.value.length || isSending.value) return;

    store.commit(SET_IS_SENDING, true);
    socketEmit(CHAT_MESSAGE, {
      chatId: currentChat.value?._id,
      text: message.value.trim(),
      datetime: moment().format(),
      reciever: reciever.value,
      sender: sender.value,
      isRead: false
    });
    store.commit(SET_IS_SENDING, false);
    message.value = '';
    cb();
  };

  const onInputChange = (value: string) => {
    message.value = value;
  };

  const insertEmoji = (emoji: any, textarea: any) => {
    const cursorPosition = textarea.selectionEnd;
    const start = textarea.value.substring(0, textarea.selectionStart);
    const end = textarea.value.substring(textarea.selectionStart);
    const text = start + emoji.data + end;
    message.value = text;
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd =
        cursorPosition + emoji.data.length;
    }, 50);
  };

  return {
    loadMoreMessages,
    isTyping,
    reciever,
    messages,
    sendMessage,
    moment,
    message,
    onInputChange,
    insertEmoji,
    isSending
  };
};

export default useSelectedChat;
