import store from '@/store';
import { GET_CHATS } from '@/store/Chats/constants';
import { GET_USER } from '@/store/User/constants';
import { GET_ALL_USERS, GET_USER_BY_NAME } from '@/store/Users/constants';
import { computed, ref, watch } from '@vue/composition-api';

const useChats = () => {
  // parse from localstorage boolean
  const isMyChatsActive = ref(
    localStorage.getItem('VTChat_isMyChatsActive') === 'true'
  );
  const currentUser = computed(() => store.getters[GET_USER]);
  const users = computed(() =>
    store.getters[GET_ALL_USERS]?.filter(
      (user: any) => user.username !== currentUser.value.username
    )
  );

  const chatUsers = computed(() =>
    store.getters[GET_CHATS].map((chat: any) =>
      store.getters[GET_USER_BY_NAME](
        chat.members[0]?.username.includes(currentUser.value.username)
          ? chat.members[1]?.username
          : chat.members[0]?.username
      )
    )
  );
  watch(isMyChatsActive, () =>
    localStorage.setItem(
      'VTChat_isMyChatsActive',
      isMyChatsActive.value.toString()
    )
  );
  // watch(chatUsers, () => console.log(chatUsers.value));
  return {
    users,
    chatUsers,
    isMyChatsActive
  };
};

export default useChats;
