import store from '@/store';
import { GET_USER } from '@/store/User/constants';
import { computed, onMounted, ref } from '@vue/composition-api';
import moment from 'moment';

const useMessage = () => {
  const currentUser = computed(() => store.getters[GET_USER]);
  const msgRef = ref();

  const getStyledUsername = (msg: any) => {
    if (isMyMessage(msg)) {
      return `
      <span class="${msg.sender.rank.toLowerCase()}">
      Вы
      </span>`;
    } else {
      return `
      <span class="${msg.sender.rank.toLowerCase()}">
      [${msg.sender.rank.slice(0, 1)}] ${msg.sender.username}
      </span>`;
    }
  };

  const isMyMessage = (msg: any) =>
    msg.sender.username.includes(currentUser.value.username);

  const checkDate = (msg: any) => {
    const isYesterday = moment(msg.datetime).isSame(
      moment().subtract(1, 'day'),
      'day'
    );
    if (isYesterday) return moment(msg.datetime).format('Вчера | HH:mm');

    const isBefore = moment(msg.datetime).isBefore(
      moment().subtract(1, 'day'),
      'day'
    );
    if (isBefore) return moment(msg.datetime).format('HH:mm | DD.MM.YYYY');
    return moment(msg.datetime).format('HH:mm');
  };

  onMounted(() => msgRef.value.scrollIntoView());

  return {
    getStyledUsername,
    isMyMessage,
    checkDate,
    msgRef
  };
};

export default useMessage;
