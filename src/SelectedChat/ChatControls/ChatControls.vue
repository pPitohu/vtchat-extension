<template>
  <div class="selected-chat__content-input">
    <textarea
      ref="textarea"
      :value="message"
      @input="$emit('inputChange', $event.target.value)"
      @keydown.enter.exact.prevent.stop="
        $emit('sendMessage', message, () => textarea.focus())
      "
      placeholder="Напишите сообщение"
      class="selected-chat__content-input_textarea"
    ></textarea>
    <div class="selected-chat__content-input-send">
      <EmojiPicker
        class="emoji-picker"
        @emoji="$emit('insertEmoji', $event, textarea)"
        :search="searchEmoji"
      >
        <vs-button
          slot="emoji-invoker"
          slot-scope="{ events: { click: clickEvent } }"
          @click.stop="clickEvent"
          icon
          circle
          color="dark"
          class="selected-chat__content-input-send_emoji"
        >
          <i class="bx bx-smile"></i>
        </vs-button>
        <div
          class="emoji-list"
          slot="emoji-picker"
          slot-scope="{ emojis, insert }"
        >
          <div class="emoji-list-search">
            <input
              class="regular-input"
              v-model="searchEmoji"
              placeholder="Search..."
            />
          </div>
          <div
            class="emoji-list-category"
            v-for="(emojiGroup, category) in emojis"
            :key="category"
          >
            <h5 class="emoji-list-category-title">{{ category }}</h5>
            <div class="emoji-list-category-items-wrapper">
              <vs-button
                v-for="(emoji, emojiName) in emojiGroup"
                class="emoji-list-category-item"
                :key="emojiName"
                :title="emojiName"
                @click="insert(emoji)"
                color="#ccc"
                icon
                circle
              >
                {{ emoji }}
              </vs-button>
            </div>
          </div>
        </div>
      </EmojiPicker>
      <vs-button
        icon
        color="success"
        floating
        circle
        :loading="isSending"
        class="selected-chat__content-input-send_button"
        @click="$emit('sendMessage', message, () => textarea.focus())"
      >
        <i class="bx bx-send"></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker';
import useChatControls from '@/SelectedChat/ChatControls/ChatControls';

export default {
  props: ['message', 'isSending'],
  setup() {
    return useChatControls();
  },
  components: {
    EmojiPicker
  }
};
</script>

<style lang="scss" scoped>
@import '@/SelectedChat/ChatControls/ChatControls';
</style>
