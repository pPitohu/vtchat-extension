/*  eslint-disable */
import { computed, ref, watch } from '@vue/composition-api';
import store from '@/store';
import router from '@/router';
import { GET_ALL_USERS, GET_USER_BY_NAME } from '@/store/Users/constants';
import { INIT_CHAT } from '@/store/Chats/constants';
import { socketEmit } from '@/helpers/socket';
import { GET_USER } from '@/store/User/constants';

const useApp = () => {
  const isModalOpen = ref(false);
  const currentUser = computed(() => store.getters[GET_USER]);
  const users = computed(() => store.getters[GET_ALL_USERS]);

  const setModalOpen = (): void => {
    isModalOpen.value = true;
  };
  const setModalClose = (): void => {
    isModalOpen.value = false;
  };

  const openChatWith = (username: string) => {
    setModalOpen();

    setTimeout(() => {
      router.push({
        name: 'chats',
        params: { username }
      });
    }, 100);
  };

  if (window.location.href.includes('player')) {
    const parsedNickname = window.location.pathname.split('/')[2];

    watch(users, () => {
      const user = store.getters[GET_USER_BY_NAME](parsedNickname);
      if (!user || document.querySelector('.vt-chat-send-button')) return;
      const btn = document.createElement('button');
      btn.innerHTML =
        '<div class="vt-chat-send-button vs-button__content">Написать сообщение</div>';
      btn.style.outline = 'none';
      btn.className =
        'vs-button vs-button--null vs-button--size-null vs-button--circle vs-button--danger vs-button--default';
      btn.addEventListener('click', () => {
        socketEmit(INIT_CHAT, { sender: currentUser.value, reciever: user });
        openChatWith(user.username);
      });
      document
        .querySelector('.profile-header-body .align-items-center')
        ?.appendChild(btn);
    });
  }

  return {
    isModalOpen,
    setModalOpen,
    setModalClose
  };
};

export default useApp;
