import { onMounted, ref } from '@vue/composition-api';

const useChatControls = () => {
  const searchEmoji = ref('');
  const textarea = ref();

  onMounted(() => textarea.value.focus());

  return {
    searchEmoji,
    textarea
  };
};

export default useChatControls;
