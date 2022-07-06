<template>
  <div class="selected-chat__content-input">
    <textarea
      ref="textarea"
      :value="message"
      @input="$emit('inputChange', $event.target.value)"
      @keydown.enter.exact.prevent.stop="handleSend"
      placeholder="Напишите сообщение"
      class="selected-chat__content-input_textarea"
    ></textarea>
    <div class="selected-chat__content-input-send">
      <VEmojiPicker
        v-show="isEmojiPickerOpen"
        :emojisByRow="7"
        :emojiSize="28"
        :emojiWithBorder="false"
        class="emoji-picker"
        labelSearch="Search..."
        @select="$emit('insertEmoji', $event, textarea)"
      />
      <vs-button
        @click="toggleEmojiPicker"
        icon
        circle
        color="dark"
        class="selected-chat__content-input-send_emoji"
      >
        <i class="bx bx-smile"></i>
      </vs-button>
      <vs-button
        icon
        color="success"
        floating
        circle
        :loading="isSending"
        class="selected-chat__content-input-send_button"
        @click="handleSend"
      >
        <i class="bx bx-send"></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
import useChatControls from '@/SelectedChat/ChatControls/ChatControls';

export default {
  props: ['message', 'isSending'],
  setup(_, context) {
    return useChatControls(context);
  }
};
</script>

<style lang="scss" scoped>
@import '@/SelectedChat/ChatControls/ChatControls';
</style>
