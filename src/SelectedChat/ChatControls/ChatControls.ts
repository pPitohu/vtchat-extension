import { onMounted, ref } from '@vue/composition-api';

const useChatControls = ({ emit }: any) => {
  const searchEmoji = ref('');
  const textarea = ref();
  const isEmojiPickerOpen = ref(false);

  const toggleEmojiPicker = () => {
    isEmojiPickerOpen.value = !isEmojiPickerOpen.value;
  };

  onMounted(() => {
    textarea.value.focus();
  });

  const handleSend = () => {
    isEmojiPickerOpen.value = false;
    emit('sendMessage', () => textarea.value.focus());
  };

  return {
    searchEmoji,
    textarea,
    toggleEmojiPicker,
    isEmojiPickerOpen,
    handleSend
  };
};

export default useChatControls;
