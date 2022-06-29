import store from '@/store';
import { IS_USER_LOADING } from '@/store/Users/constants';
import { IS_CHATS_LOADING } from '@/store/Chats/constants';
import { computed, onMounted, ref } from '@vue/composition-api';

const useDialog = (props: any, context: any) => {
  const isOpen = computed(() => props.isModalOpen);
  const isLoaded = computed(
    () => store.getters[IS_USER_LOADING] && store.getters[IS_CHATS_LOADING]
  );

  const emitCloseModal = () => {
    // console.clear();
    context.emit('closeModal');
  };

  return {
    isLoaded,
    isOpen,
    emitCloseModal
  };
};

export default useDialog;
