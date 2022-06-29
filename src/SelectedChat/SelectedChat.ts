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
  GET_CHATS
} from '@/store/Chats/constants';
import { GET_USER } from '@/store/User/constants';
import { computed, onMounted, ref, watch } from '@vue/composition-api';
import { socketEmit } from '@/helpers/socket';
import { Chat } from '@/store/Chats/types';

const useSelectedChat = () => {
  const sender = computed(() => store.getters[GET_USER]);
  const reciever = computed(() =>
    store.getters[GET_USER_BY_NAME](router.currentRoute.params.username)
  );
  const chats = computed(() => store.getters[GET_CHATS]);
  const currentChat = computed(() => store.getters[GET_CURRENT_CHAT]);
  const isSending = computed(() => store.getters[GET_IS_SENDING]);
  const messages = computed(() => currentChat.value?.messages);
  const messagesContainer = ref();
  const message = ref('');

  watch(messages, () => scrollToBottom());
  onMounted(() => {
    setTimeout(() => {
      const chatId = chats.value?.find((c: Chat) => {
        return (
          JSON.stringify(c.members) ===
            JSON.stringify([sender.value.username, reciever.value.username]) ||
          JSON.stringify(c.members) ===
            JSON.stringify([reciever.value.username, sender.value.username])
        );
      })?._id;
      chatId && store.commit(SET_CURRENT_CHAT, chatId);
    }, 200);
    watch([currentChat, sender, reciever, messages], () =>
      socketEmit(CONNECT_TO_CHAT, {
        chatId: currentChat.value._id
      })
    );
  });

  const getStyledUsername = (msg: any) => {
    const foundUser = store.getters[GET_USER_BY_NAME](msg.sender.username);
    if (foundUser && isMyMessage(msg)) {
      return `
      <span class="${foundUser.rank.toLowerCase()}">
      Вы
      </span>`;
    } else if (foundUser) {
      return `
      <span class="${foundUser.rank.toLowerCase()}">
      [${foundUser.rank.slice(0, 1)}] ${foundUser.username}
      </span>`;
    }
    return msg.sender.username;
  };

  const sendMessage = (msg: string, cb: () => void) => {
    if (!msg.length || isSending.value) return;

    store.commit(SET_IS_SENDING, true);
    socketEmit(CHAT_MESSAGE, {
      chatId: currentChat.value?._id,
      text: msg.trim(),
      datetime: moment().format(),
      reciever: reciever.value,
      sender: sender.value
    });
    store.commit(SET_IS_SENDING, false);
    message.value = '';
    cb();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: 'smooth'
      });
    }, 10);
  };

  const checkDate = (msgIndex: number) => {
    const currMsg = messages.value[msgIndex];
    const isYesterday = moment(currMsg.datetime).isSame(
      moment().subtract(1, 'day'),
      'day'
    );
    if (isYesterday) return 'Вчера';

    const isBefore = moment(moment(new Date()).format('DD.MM.YYYY')).isBefore(
      moment(currMsg.datetime).format('DD.MM.YYYY')
    );
    if (isBefore) return moment(currMsg.datetime).format('HH:mm DD.MM.YYYY');
    return moment(currMsg.datetime).format('HH:mm');
  };

  const onInputChange = (value: string) => {
    message.value = value;
  };

  const insertEmoji = (emoji: any, textarea: any) => {
    // paste emoji on cursor position and keep cursor on that position after emoji
    const cursorPosition = textarea.selectionEnd;
    const start = textarea.value.substring(0, textarea.selectionStart);
    const end = textarea.value.substring(textarea.selectionStart);
    const text = start + emoji + end;
    message.value = text;
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd =
        cursorPosition + emoji.length;
    }, 50);
  };

  const isMyMessage = (msg: any) =>
    msg?.sender?.username.includes(sender.value.username);

  return {
    getStyledUsername,
    isMyMessage,
    reciever,
    messages,
    sendMessage,
    messagesContainer,
    moment,
    message,
    onInputChange,
    insertEmoji,
    checkDate,
    isSending
  };
};

export default useSelectedChat;
