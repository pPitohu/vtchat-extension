import { onMounted, computed } from '@vue/composition-api';
import { parseSessionVariable } from '@/helpers/parseSessionVariable';
import { STORE_USER, GET_USER } from '@/store/User/constants';
import store from '@/store';

const useApp = () => {
  const user = computed(() => store.getters[GET_USER]);
  onMounted(() => {
    const session = parseSessionVariable();
    if (!session) console.log('no session');
    else store.dispatch(STORE_USER, session);
  });
  return {
    user
  };
};

export default useApp;
